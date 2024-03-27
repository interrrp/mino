import { Bot, Player } from "mineflayer";

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
 * @returns The player, or null if it doesn't exist.
 */
export function findPlayer(bot: Bot, sender: string, reference: string): Player | null {
  if (reference === "me") {
    return bot.players[sender];
  } else if (reference === "you") {
    return bot.player;
  }

  const player = bot.players[reference];
  if (player) {
    return player;
  }

  const players = Object.values(bot.players).filter((p) => p.username.toLowerCase().includes(reference.toLowerCase()));
  if (players.length === 1) {
    return players[0];
  }

  return bot.players[sender];
}
