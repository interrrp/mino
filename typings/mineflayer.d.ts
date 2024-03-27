/**
 * @file Bot type definitions for items that are going to be injected into
 * the Mineflayer `Bot` type.
 */

import mineflayer from "mineflayer";

import PvpPlugin from "../src/plugins/pvp/PvpPlugin";
import CommandsPlugin from "../src/plugins/commands/CommandsPlugin";

declare module "mineflayer" {
  interface Bot {
    options: mineflayer.BotOptions;
    commands: CommandsPlugin;
    pvp: PvpPlugin;
  }
}
