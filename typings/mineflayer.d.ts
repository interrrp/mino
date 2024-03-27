/**
 * @file Bot type definitions for items that are going to be injected into
 * the Mineflayer `Bot` type.
 */
import mineflayer from "mineflayer";

import CommandsPlugin from "../src/plugins/commands/CommandsPlugin";
import PvpPlugin from "../src/plugins/pvp/PvpPlugin";

declare module "mineflayer" {
  interface Bot {
    options: mineflayer.BotOptions;
    commands: CommandsPlugin;
    pvp: PvpPlugin;
  }
}
