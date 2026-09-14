import type { ImageInfo, PayloadHeader } from "@/types/steganography";
import { HEADER_SIZE } from "./constants";
import { extractBytesFromPixels } from "./core";
import { parseHeader, unpackPayload } from "./payload";
import { extractInWorker } from "./worker-client";
import { fileToImageData } from "@/lib/validation/image";

export async function inspectImage(image: ImageInfo): Promise<PayloadHeader> {
  const imageData = await fileToImageData(image);
  const headerBytes = extractBytesFromPixels(imageData.data, HEADER_SIZE);
  const header = parseHeader(headerBytes);
  const totalBytes = HEADER_SIZE + header.payloadLength;
  if (totalBytes * 8 > image.width * image.height * 3) {
    throw new Error("CORRUPTED_DATA");
  }
  return header;
}

export async function decodeImage(
  image: ImageInfo,
  header: PayloadHeader,
  password?: string,
): Promise<string> {
  const imageData = await fileToImageData(image);
  const bytes = await extractInWorker(
    new Uint8ClampedArray(imageData.data),
    HEADER_SIZE + header.payloadLength,
  );
  return unpackPayload(bytes, header, password);
}
