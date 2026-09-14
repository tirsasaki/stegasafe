/// <reference lib="webworker" />

import { embedBytesInPixels, extractBytesFromPixels } from "@/lib/steganography/core";
import type { WorkerRequest, WorkerResponse } from "@/types/steganography";

self.onmessage = (event: MessageEvent<WorkerRequest>) => {
  const request = event.data;
  try {
    const pixels = new Uint8ClampedArray(request.pixels);
    const result =
      request.action === "embed"
        ? embedBytesInPixels(pixels, new Uint8Array(request.data))
        : extractBytesFromPixels(pixels, request.byteLength);
    const data = result.buffer as ArrayBuffer;
    const response: WorkerResponse = { id: request.id, ok: true, data };
    self.postMessage(response, { transfer: [data] });
  } catch (error) {
    const response: WorkerResponse = {
      id: request.id,
      ok: false,
      error: error instanceof Error ? error.message : "PROCESSING_FAILED",
    };
    self.postMessage(response);
  }
};

export {};
