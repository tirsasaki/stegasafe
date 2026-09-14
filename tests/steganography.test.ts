import { describe, expect, it } from "vitest";
import { capacityUsage, maximumMessageBytes } from "@/lib/steganography/capacity";
import { embedBytesInPixels, extractBytesFromPixels } from "@/lib/steganography/core";
import { HEADER_SIZE } from "@/lib/steganography/constants";
import { buildPayload, parseHeader, unpackPayload } from "@/lib/steganography/payload";

function carrierFor(byteLength: number): Uint8ClampedArray {
  const pixels = Math.ceil((byteLength * 8) / 3);
  const data = new Uint8ClampedArray(pixels * 4);
  for (let index = 3; index < data.length; index += 4) data[index] = 255;
  return data;
}

describe("StegaSafe payload", () => {
  it.each([
    "Pesan rahasia bahasa Indonesia",
    "An English secret",
    "秘密のメッセージ",
    "Emoji aman 🔐🌙✨",
  ])("encode dan decode pesan Unicode: %s", async (message) => {
    const payload = await buildPayload(message, false);
    const encoded = embedBytesInPixels(carrierFor(payload.length), payload);
    const extracted = extractBytesFromPixels(encoded, payload.length);
    const header = parseHeader(extracted.slice(0, HEADER_SIZE));
    await expect(unpackPayload(extracted, header)).resolves.toBe(message);
  });

  it("encode dan decode pesan terenkripsi", async () => {
    const payload = await buildPayload("sangat rahasia", true, "kata-sandi-kuat");
    const header = parseHeader(payload.slice(0, HEADER_SIZE));
    expect(header.encrypted).toBe(true);
    await expect(unpackPayload(payload, header, "kata-sandi-kuat")).resolves.toBe("sangat rahasia");
  });

  it("menolak kata sandi yang salah", async () => {
    const payload = await buildPayload("rahasia", true, "benar");
    const header = parseHeader(payload.slice(0, HEADER_SIZE));
    await expect(unpackPayload(payload, header, "salah")).rejects.toThrow("DECRYPTION_FAILED");
  });

  it("menolak pesan kosong", async () => {
    await expect(buildPayload("", false)).rejects.toThrow("EMPTY_MESSAGE");
  });

  it("mendeteksi payload yang rusak", async () => {
    const payload = await buildPayload("jangan diubah", false);
    payload[payload.length - 1] ^= 1;
    const header = parseHeader(payload.slice(0, HEADER_SIZE));
    await expect(unpackPayload(payload, header)).rejects.toThrow("CORRUPTED_DATA");
  });

  it("menolak gambar tanpa magic signature", () => {
    expect(() => parseHeader(new Uint8Array(HEADER_SIZE))).toThrow("NO_PAYLOAD");
  });

  it("mendukung pesan mendekati batas dan menolak yang melebihi kapasitas", () => {
    const maximum = maximumMessageBytes(100, 100);
    expect(maximum).toBeGreaterThan(0);
    expect(capacityUsage(maximum - 1, 100, 100)).toBeLessThanOrEqual(100);
    expect(capacityUsage(maximum + 1, 100, 100)).toBe(100);
    expect(() => embedBytesInPixels(carrierFor(1), new Uint8Array(2))).toThrow("CAPACITY_EXCEEDED");
  });
});
