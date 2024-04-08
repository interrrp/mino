import config from "config";

import { Bot } from "mineflayer";
import { Movements } from "mineflayer-pathfinder";

import logger from "@/logger";
import startBot from "@/startBot";
import { sleep } from "@/utils/common";

/**
 * This plugin is used to handle events that are not specific to any other
 * plugin.
 *
 * This plugin should always come after the pathfinder plugin, since it loads
 * the pathfinder movements.
 *
 * @param bot The bot.
 */
export default function corePlugin(bot: Bot): void {
  loadPathfinderMovements(bot);

  bot.once("spawn", () => handleSpawn(bot));
  bot.on("kicked", async (reason) => await handleKick(bot, reason));
}

function handleSpawn(bot: Bot): void {
  logger.info(`Spawned at ${bot.entity.position.rounded()}`);
}

// prettier-ignore
type KickReason =
  | { type: "string"; value: string }
  | { type: "compound"; value: { translate: { type: "string", value: string } } }
  | string;

/**
 * Handles when the bot gets kicked.
 *
 * @param bot The bot.
 * @param reason The reason for the kick.
 * @param loggedIn Whether the bot was logged in when kicked.
 */
async function handleKick(bot: Bot, reason: KickReason): Promise<void> {
  if (typeof reason !== "string") {
    reason = reason.type === "compound" ? reason.value.translate.value : reason.value;
  }

  if (!reason) {
    logger.warn("Kicked from server for no reason");
  } else {
    logger.warn(`Kicked from server: "${reason}"`);
  }

  await reconnectOnKick();
}

async function reconnectOnKick(): Promise<void> {
  const reconnectOnKick = config.plugins.core.reconnectOnKick;
  if (reconnectOnKick.enabled) {
    logger.info(`Reconnecting in ${reconnectOnKick.delay}ms`);
    await sleep(reconnectOnKick.delay);

    await startBot();
  }
}

function loadPathfinderMovements(bot: Bot): void {
  const movements = new Movements(bot);
  bot.pathfinder.setMovements(movements);
}
