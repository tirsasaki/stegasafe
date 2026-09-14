import type { WorkerRequest, WorkerResponse } from "@/types/steganography";

function runWorker(request: WorkerRequest, transfers: Transferable[]): Promise<ArrayBuffer> {
  if (typeof Worker === "undefined") return Promise.reject(new Error("WORKER_UNAVAILABLE"));
  const worker = new Worker(
    new URL("../../workers/steganography.worker.ts", import.meta.url),
    { type: "module" },
  );

  return new Promise((resolve, reject) => {
    worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
      if (event.data.id !== request.id) return;
      worker.terminate();
      if (event.data.ok) resolve(event.data.data);
      else reject(new Error(event.data.error));
    };
    worker.onerror = () => {
      worker.terminate();
      reject(new Error("PROCESSING_FAILED"));
    };
    worker.postMessage(request, transfers);
  });
}

export async function embedInWorker(
  pixels: Uint8ClampedArray,
  data: Uint8Array,
): Promise<Uint8ClampedArray> {
  const pixelBuffer = pixels.buffer as ArrayBuffer;
  const dataBuffer = data.buffer as ArrayBuffer;
  const request: WorkerRequest = {
    id: crypto.randomUUID(),
    action: "embed",
    pixels: pixelBuffer,
    data: dataBuffer,
  };
  return new Uint8ClampedArray(
    await runWorker(request, [pixelBuffer, dataBuffer]),
  );
}

export async function extractInWorker(
  pixels: Uint8ClampedArray,
  byteLength: number,
): Promise<Uint8Array> {
  const pixelBuffer = pixels.buffer as ArrayBuffer;
  const request: WorkerRequest = {
    id: crypto.randomUUID(),
    action: "extract",
    pixels: pixelBuffer,
    byteLength,
  };
  return new Uint8Array(await runWorker(request, [pixelBuffer]));
}
