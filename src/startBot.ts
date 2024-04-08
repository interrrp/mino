import config from "config";

import { Bot, createBot } from "mineflayer";
import { pathfinder as pathfinderPlugin } from "mineflayer-pathfinder";

import handleError from "@/handleError";
import logger from "@/logger";
import autoArmorPlugin from "@/plugins/autoArmorPlugin";
import commandsPlugin from "@/plugins/commands";
import corePlugin from "@/plugins/corePlugin";
import motherPlugin from "@/plugins/motherPlugin";
import pvpPlugin from "@/plugins/pvp";
import webPlugin from "@/plugins/webPlugin";

export default async function startBot(): Promise<Bot> {
  logger.info("Starting");

  const options = {
    username: config.bot.username,
    password: config.bot.password,
    brand: config.bot.brand,

    host: config.server.host,
    port: config.server.port,
  };
  const bot = createBot(options);
  bot.options = options;

  bot.on("error", handleError);

  bot.loadPlugins([pathfinderPlugin, corePlugin, motherPlugin, commandsPlugin, pvpPlugin, autoArmorPlugin, webPlugin]);

  return bot;
}
