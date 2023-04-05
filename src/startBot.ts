import { Bot, createBot } from "mineflayer";

import { pathfinder as pathfinderPlugin } from "mineflayer-pathfinder";

import corePlugin from "./plugins/corePlugin";
import autoArmorPlugin from "./plugins/autoArmorPlugin";
import pvpPlugin from "./plugins/pvp";
import commandsPlugin from "./plugins/commands";

import handleError from "./handleError";
import logger from "./logger";

import config from "../qbot.config.json";

/**
 * Starts the bot.
 */
export default async function startBot(): Promise<Bot> {
  const options = {
    username: config.bot.username,
    password: config.bot.password,
    brand: config.bot.brand,

    host: config.server.host,
    port: config.server.port,
  };

  logger.info("Creating bot object");
  const bot = createBot(options);
  bot.options = options;

  // Error handler is registered here and not in the core plugin/other plugins
  // because the error handler needs to be registered before any other plugins
  logger.info("Registering error handler");
  bot.on("error", handleError);

  logger.info("Loading plugins");
  bot.loadPlugins([
    pathfinderPlugin,
    corePlugin,
    commandsPlugin,
    pvpPlugin,
    autoArmorPlugin,
  ]);

  return bot;
}
