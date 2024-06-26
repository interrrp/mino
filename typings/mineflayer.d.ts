/**
 * @file Bot type definitions for items that are going to be injected into
 * the Mineflayer `Bot` type.
 */
import mineflayer from "mineflayer";

import { MotherOptions } from "@/src/plugins/motherPlugin";
import PvpPlugin from "@/src/plugins/pvp/PvpPlugin";

declare module "mineflayer" {
  interface Bot {
    options: mineflayer.BotOptions;
    pvp: PvpPlugin;
    mother: MotherOptions & { doingMLG: boolean };
  }
}
