export function usableChannelCount(pixels: Uint8ClampedArray): number {
  return Math.floor(pixels.length / 4) * 3;
}

function channelIndex(bitIndex: number): number {
  const pixel = Math.floor(bitIndex / 3);
  const channel = bitIndex % 3;
  return pixel * 4 + channel;
}

export function embedBytesInPixels(
  pixels: Uint8ClampedArray,
  bytes: Uint8Array,
): Uint8ClampedArray {
  const neededBits = bytes.length * 8;
  if (neededBits > usableChannelCount(pixels)) {
    throw new Error("CAPACITY_EXCEEDED");
  }

  const output = new Uint8ClampedArray(pixels);
  for (let bit = 0; bit < neededBits; bit += 1) {
    const byte = bytes[Math.floor(bit / 8)];
    const value = (byte >> (7 - (bit % 8))) & 1;
    const index = channelIndex(bit);
    output[index] = (output[index] & 0xfe) | value;
  }
  return output;
}

export function extractBytesFromPixels(
  pixels: Uint8ClampedArray,
  byteLength: number,
): Uint8Array {
  const neededBits = byteLength * 8;
  if (neededBits > usableChannelCount(pixels)) {
    throw new Error("INVALID_LENGTH");
  }

  const output = new Uint8Array(byteLength);
  for (let bit = 0; bit < neededBits; bit += 1) {
    const value = pixels[channelIndex(bit)] & 1;
    output[Math.floor(bit / 8)] |= value << (7 - (bit % 8));
  }
  return output;
}
