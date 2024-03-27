import { Bot } from "mineflayer";

import CommandsPlugin from "./CommandsPlugin";

/**
 * This plugin adds a command system to the bot.
 *
 * @param bot The bot.
 */
export default function commandsPlugin(bot: Bot): void {
  CommandsPlugin.register(bot);
}
