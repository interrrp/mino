import { Bot } from "mineflayer";

import PvpPlugin from "./PvpPlugin";

/**
 * This plugin is used to add PvP functionality to the bot.
 *
 * @param bot The bot.
 */
export default function pvpPlugin(bot: Bot): void {
  PvpPlugin.register(bot);
}
