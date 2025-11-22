declare module "blurhash" {
  /**
   * Encode raw pixel data to a blurhash string.
   * pixels: Uint8ClampedArray in RGBA order (width * height * 4)
   */
  export function encode(
    pixels: Uint8ClampedArray,
    width: number,
    height: number,
    componentX?: number,
    componentY?: number
  ): string;

  /**
   * Decode a blurhash string to raw pixel data (RGBA)
   */
  export function decode(
    blurHash: string,
    width: number,
    height: number,
    punch?: number
  ): Uint8ClampedArray;
}
