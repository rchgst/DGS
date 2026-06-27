import LZString from 'lz-string';

/**
 * Compresses any object (e.g. diagrams block graph) into a URL-safe base64 string.
 * 
 * @param data JavaScript object to compress
 * @returns Compressed string
 */
export function compressToURL(data: any): string {
  const jsonStr = JSON.stringify(data);
  return LZString.compressToEncodedURIComponent(jsonStr);
}

/**
 * Decompresses a URL-safe string back into its original object.
 * 
 * @param compressedString The compressed hash from URL
 * @returns The original parsed object or null if decompression failed
 */
export function decompressFromURL(compressedString: string): any | null {
  try {
    const jsonStr = LZString.decompressFromEncodedURIComponent(compressedString);
    if (!jsonStr) return null;
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error('Error decompressing URL diagram data:', error);
    return null;
  }
}
