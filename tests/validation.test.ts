import { describe, expect, it } from "vitest";
import { validatePng } from "@/lib/validation/image";

const signature = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

describe("validasi gambar", () => {
  it("menerima PNG dengan MIME dan signature yang benar", async () => {
    const file = new File([signature], "image.png", { type: "image/png" });
    await expect(validatePng(file)).resolves.toBeUndefined();
  });

  it("menolak file selain PNG", async () => {
    const file = new File(["hello"], "image.jpg", { type: "image/jpeg" });
    await expect(validatePng(file)).rejects.toThrow("INVALID_FILE_TYPE");
  });

  it("menolak file palsu dengan ekstensi PNG", async () => {
    const file = new File(["not png"], "image.png", { type: "image/png" });
    await expect(validatePng(file)).rejects.toThrow("INVALID_PNG_CONTENT");
  });
});
