export type ImageInfo = {
  file: File;
  url: string;
  name: string;
  size: number;
  width: number;
  height: number;
};

export type PayloadHeader = {
  encrypted: boolean;
  payloadLength: number;
  salt: Uint8Array;
  iv: Uint8Array;
};

export type ToastState = {
  type: "success" | "error" | "info";
  message: string;
} | null;

export type WorkerRequest =
  | { id: string; action: "embed"; pixels: ArrayBuffer; data: ArrayBuffer }
  | { id: string; action: "extract"; pixels: ArrayBuffer; byteLength: number };

export type WorkerResponse =
  | { id: string; ok: true; data: ArrayBuffer }
  | { id: string; ok: false; error: string };
