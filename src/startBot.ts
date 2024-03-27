import config from "../qbot.config.json";

import { Bot, createBot } from "mineflayer";
import { pathfinder as pathfinderPlugin } from "mineflayer-pathfinder";

import handleError from "./handleError";
import logger from "./logger";
import autoArmorPlugin from "./plugins/autoArmorPlugin";
import commandsPlugin from "./plugins/commands";
import corePlugin from "./plugins/corePlugin";
import pvpPlugin from "./plugins/pvp";

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

  logger.info("Registering error handler");
  bot.on("error", handleError);

  logger.info("Loading plugins");
  bot.loadPlugins([pathfinderPlugin, corePlugin, commandsPlugin, pvpPlugin, autoArmorPlugin]);

  return bot;
}
