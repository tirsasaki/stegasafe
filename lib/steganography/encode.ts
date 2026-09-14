import type { ImageInfo } from "@/types/steganography";
import { maximumMessageBytes } from "./capacity";
import { buildPayload } from "./payload";
import { embedInWorker } from "./worker-client";
import { fileToImageData, imageDataToPng } from "@/lib/validation/image";

export async function encodeImage(
  image: ImageInfo,
  message: string,
  encrypted: boolean,
  password?: string,
): Promise<Blob> {
  if (!message.length) throw new Error("EMPTY_MESSAGE");
  const messageBytes = new TextEncoder().encode(message).length;
  if (messageBytes > maximumMessageBytes(image.width, image.height)) {
    throw new Error("CAPACITY_EXCEEDED");
  }

  const [imageData, payload] = await Promise.all([
    fileToImageData(image),
    buildPayload(message, encrypted, password),
  ]);
  const pixels = await embedInWorker(
    new Uint8ClampedArray(imageData.data),
    new Uint8Array(payload),
  );

  // ImageData requires an ArrayBuffer-backed array. Copying also guarantees
  // ownership after the original pixel buffer has crossed a Worker boundary.
  const imageDataBuffer = new ArrayBuffer(pixels.byteLength);
  const imageDataPixels = new Uint8ClampedArray(imageDataBuffer);
  imageDataPixels.set(pixels);

  return imageDataToPng(
    new ImageData(imageDataPixels, imageData.width, imageData.height),
  );
}
