/**
 * @file Bot type definitions for items that are going to be injected into
 * the Mineflayer `Bot` type.
 */

import mineflayer from "mineflayer";

import PvpPlugin from "./plugins/pvp/PvpPlugin";
import CommandsPlugin from "./plugins/commands/CommandsPlugin";

declare module "mineflayer" {
  interface Bot {
    /**
     * The initial options that were passed to the bot.
     */
    options: mineflayer.BotOptions;

    /**
     * The commands plugin.
     */
    commands: CommandsPlugin;

    /**
     * The PvP plugin.
     */
    pvp: PvpPlugin;
  }
}
