import config from "../../qbot.config.json";

import { Bot } from "mineflayer";
import { Movements } from "mineflayer-pathfinder";

import logger from "../logger";
import startBot from "../startBot";
import { sleep } from "../utils/common";

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

  bot.once("spawn", handleSpawn);
  bot.on("kicked", async (reason) => await handleKick(bot, reason));
}

function handleSpawn(): void {
  logger.info("Spawned");
}

/**
 * Compound text type for the kick reason.
 */
interface CompoundText {
  type: "compound";
  value: {
    translate: {
      type: "string";
      value: string;
    };
  };
}

/**
 * Handles when the bot gets kicked.
 *
 * @param bot The bot.
 * @param reason The reason for the kick.
 * @param loggedIn Whether the bot was logged in when kicked.
 */
async function handleKick(bot: Bot, reason: CompoundText | string): Promise<void> {
  if (typeof reason !== "string") {
    reason = reason.value.translate.value;
  }

  if (!reason) {
    logger.error("Kicked from server for no reason");
  } else {
    logger.error(`Kicked from server: "${reason}"`);
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
