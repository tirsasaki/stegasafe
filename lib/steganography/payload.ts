import { decryptMessage } from "@/lib/crypto/decrypt";
import { encryptMessage } from "@/lib/crypto/encrypt";
import type { PayloadHeader } from "@/types/steganography";
import {
  FLAG_ENCRYPTED,
  FORMAT_VERSION,
  HASH_LENGTH,
  HEADER_SIZE,
  IV_LENGTH,
  MAGIC,
  SALT_LENGTH,
} from "./constants";

function writeUint32(value: number): Uint8Array {
  const bytes = new Uint8Array(4);
  new DataView(bytes.buffer).setUint32(0, value, false);
  return bytes;
}

function concat(...parts: Uint8Array[]): Uint8Array {
  const length = parts.reduce((sum, part) => sum + part.length, 0);
  const output = new Uint8Array(length);
  let offset = 0;
  for (const part of parts) {
    output.set(part, offset);
    offset += part.length;
  }
  return output;
}

async function integrityHash(data: Uint8Array): Promise<Uint8Array> {
  const digest = await crypto.subtle.digest("SHA-256", data as BufferSource);
  return new Uint8Array(digest).slice(0, HASH_LENGTH);
}

export async function buildPayload(
  message: string,
  encrypted: boolean,
  password?: string,
): Promise<Uint8Array> {
  if (!message.length) throw new Error("EMPTY_MESSAGE");
  const plaintext = new TextEncoder().encode(message);
  const salt = encrypted
    ? crypto.getRandomValues(new Uint8Array(SALT_LENGTH))
    : new Uint8Array(SALT_LENGTH);
  const iv = encrypted
    ? crypto.getRandomValues(new Uint8Array(IV_LENGTH))
    : new Uint8Array(IV_LENGTH);

  let payload: Uint8Array;
  if (encrypted) {
    if (!password) throw new Error("PASSWORD_REQUIRED");
    payload = await encryptMessage(plaintext, password, salt, iv);
  } else {
    payload = concat(plaintext, await integrityHash(plaintext));
  }

  const header = concat(
    MAGIC,
    new Uint8Array([FORMAT_VERSION]),
    new Uint8Array([encrypted ? FLAG_ENCRYPTED : 0]),
    writeUint32(payload.length),
    salt,
    iv,
  );
  return concat(header, payload);
}

export function parseHeader(bytes: Uint8Array): PayloadHeader {
  if (bytes.length < HEADER_SIZE) throw new Error("NO_PAYLOAD");
  for (let index = 0; index < MAGIC.length; index += 1) {
    if (bytes[index] !== MAGIC[index]) throw new Error("NO_PAYLOAD");
  }
  if (bytes[MAGIC.length] !== FORMAT_VERSION) throw new Error("UNSUPPORTED_VERSION");

  const flags = bytes[MAGIC.length + 1];
  const lengthOffset = MAGIC.length + 2;
  const payloadLength = new DataView(
    bytes.buffer,
    bytes.byteOffset + lengthOffset,
    4,
  ).getUint32(0, false);
  const saltOffset = lengthOffset + 4;
  const ivOffset = saltOffset + SALT_LENGTH;
  return {
    encrypted: Boolean(flags & FLAG_ENCRYPTED),
    payloadLength,
    salt: bytes.slice(saltOffset, saltOffset + SALT_LENGTH),
    iv: bytes.slice(ivOffset, ivOffset + IV_LENGTH),
  };
}

export async function unpackPayload(
  bytes: Uint8Array,
  header: PayloadHeader,
  password?: string,
): Promise<string> {
  const payload = bytes.slice(HEADER_SIZE, HEADER_SIZE + header.payloadLength);
  if (payload.length !== header.payloadLength) throw new Error("CORRUPTED_DATA");

  let plaintext: Uint8Array;
  if (header.encrypted) {
    if (!password) throw new Error("PASSWORD_REQUIRED");
    plaintext = await decryptMessage(payload, password, header.salt, header.iv);
  } else {
    if (payload.length < HASH_LENGTH) throw new Error("CORRUPTED_DATA");
    plaintext = payload.slice(0, -HASH_LENGTH);
    const stored = payload.slice(-HASH_LENGTH);
    const actual = await integrityHash(plaintext);
    if (!stored.every((value, index) => value === actual[index])) {
      throw new Error("CORRUPTED_DATA");
    }
  }

  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(plaintext);
  } catch {
    throw new Error("CORRUPTED_DATA");
  }
}
