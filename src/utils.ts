/**
 * @file Common utility functions that are not related to Minecraft.
 */

import { Bot, Player } from "mineflayer";

/**
 * Sleeps for the specified number of milliseconds.
 *
 * @param ms The number of milliseconds to sleep for.
 * @returns A promise that resolves after the specified number of milliseconds.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Gets a random item from an array.
 *
 * @param arr The array to get a random item from.
 * @returns A random item from the array.
 */
export function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Finds a player by a string reference.
 *
 * "me" refers to the sender.
 * "you" refers to the bot.
 *
 * If the reference is a string, it will be treated as a username.
 *
 * If we can't find a player by the reference, this will return the sender.
 *
 * @param bot The bot.
 * @param sender The username of the sender.
 * @param reference The string reference to the player.
 * @returns The player, or `undefined` if it doesn't exist.
 */
export function findPlayer(bot: Bot, sender: string, reference: string): Player | undefined {
  if (reference === "me") {
    return bot.players[sender];
  } else if (reference === "you") {
    return bot.player;
  }

  const player = bot.players[reference];
  if (player) {
    return player;
  }

  const players = Object.values(bot.players).filter((p) =>
    p.username.toLowerCase().includes(reference.toLowerCase())
  );
  if (players.length === 1) {
    return players[0];
  }

  return bot.players[sender];
}
