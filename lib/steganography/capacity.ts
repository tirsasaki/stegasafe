import { GCM_TAG_LENGTH, HEADER_SIZE, HASH_LENGTH } from "./constants";

export function totalCapacityBytes(width: number, height: number): number {
  return Math.floor((width * height * 3) / 8);
}

export function maximumMessageBytes(width: number, height: number): number {
  const payloadOverhead = Math.max(GCM_TAG_LENGTH, HASH_LENGTH);
  return Math.max(0, totalCapacityBytes(width, height) - HEADER_SIZE - payloadOverhead);
}

export function capacityUsage(
  messageBytes: number,
  width: number,
  height: number,
): number {
  const maximum = maximumMessageBytes(width, height);
  if (maximum === 0) return 100;
  return Math.min(100, (messageBytes / maximum) * 100);
}
