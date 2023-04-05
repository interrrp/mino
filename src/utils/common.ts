/**
 * @file Common utility functions that are not related to Minecraft.
 */

/**
 * Sleeps for the specified number of milliseconds.
 *
 * @param ms The number of milliseconds to sleep for.
 * @returns A promise that resolves after the specified number of milliseconds.
 */
export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Gets a random item from an array.
 *
 * @param arr The array to get a random item from.
 * @returns A random item from the array.
 */
export function randomItem(arr: any[]): any {
  return arr[Math.floor(Math.random() * arr.length)];
}
