import { GCM_TAG_LENGTH } from "@/lib/steganography/constants";
import { deriveKey } from "./encrypt";

export async function decryptMessage(
  ciphertext: Uint8Array,
  password: string,
  salt: Uint8Array,
  iv: Uint8Array,
): Promise<Uint8Array> {
  try {
    const key = await deriveKey(password, salt, "decrypt");
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: iv as BufferSource, tagLength: GCM_TAG_LENGTH * 8 },
      key,
      ciphertext as BufferSource,
    );
    return new Uint8Array(decrypted);
  } catch {
    throw new Error("DECRYPTION_FAILED");
  }
}
