import { MAX_IMAGE_BYTES } from "@/lib/steganography/constants";
import type { ImageInfo } from "@/types/steganography";

const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** index).toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
}

export async function validatePng(file: File): Promise<void> {
  if (file.size > MAX_IMAGE_BYTES) throw new Error("FILE_TOO_LARGE");
  if (file.type !== "image/png") throw new Error("INVALID_FILE_TYPE");
  const signature = new Uint8Array(await file.slice(0, 8).arrayBuffer());
  if (
    signature.length !== PNG_SIGNATURE.length ||
    !PNG_SIGNATURE.every((value, index) => signature[index] === value)
  ) {
    throw new Error("INVALID_PNG_CONTENT");
  }
}

export async function loadImageInfo(file: File): Promise<ImageInfo> {
  await validatePng(file);
  const url = URL.createObjectURL(file);
  try {
    const dimensions = await getImageDimensions(file, url);
    if (!dimensions.width || !dimensions.height) throw new Error("INVALID_IMAGE");
    return {
      file,
      url,
      name: file.name,
      size: file.size,
      width: dimensions.width,
      height: dimensions.height,
    };
  } catch (error) {
    URL.revokeObjectURL(url);
    throw error;
  }
}

async function getImageDimensions(
  file: File,
  url: string,
): Promise<{ width: number; height: number }> {
  if ("createImageBitmap" in window) {
    const bitmap = await createImageBitmap(file);
    const result = { width: bitmap.width, height: bitmap.height };
    bitmap.close();
    return result;
  }
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () =>
      resolve({ width: image.naturalWidth, height: image.naturalHeight });
    image.onerror = () => reject(new Error("INVALID_IMAGE"));
    image.src = url;
  });
}

export async function fileToImageData(info: ImageInfo): Promise<ImageData> {
  const bitmap = await createImageBitmap(info.file);
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) throw new Error("CANVAS_UNAVAILABLE");
  context.drawImage(bitmap, 0, 0);
  bitmap.close();
  return context.getImageData(0, 0, canvas.width, canvas.height);
}

export async function imageDataToPng(imageData: ImageData): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("CANVAS_UNAVAILABLE");
  context.putImageData(imageData, 0, 0);
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("EXPORT_FAILED"))),
      "image/png",
    );
  });
}
