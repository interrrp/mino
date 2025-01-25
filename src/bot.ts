import { config } from "~/config.ts";

import { createBot } from "mineflayer";
import { pathfinder as pathfinderPlugin } from "mineflayer-pathfinder";

import { handleError } from "~/errors.ts";
import * as logger from "~/logger.ts";
import autoArmorPlugin from "~/plugins/autoArmor.ts";
import commandsPlugin from "~/plugins/commands/index.ts";
import corePlugin from "~/plugins/core.ts";
import motherPlugin from "~/plugins/mother.ts";
import pvpPlugin from "~/plugins/pvp/index.ts";

export function startBot() {
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

  bot.loadPlugins([
    pathfinderPlugin,
    corePlugin,
    motherPlugin,
    commandsPlugin,
    pvpPlugin,
    autoArmorPlugin,
  ]);

  return bot;
}
