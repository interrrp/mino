import config from "config";

import { Command } from "@/plugins/commands";
import { randomItem } from "@/utils/common";
import { findPlayer } from "@/utils/minecraft";

export default {
  name: "flirt",
  aliases: ["rizz"],
  description: "Flirt with a player.",
  execute(bot, args, sender) {
    const player = findPlayer(bot, sender, args[0] ?? "");
    if (!player) return;

    const pickupLine = randomItem(config.plugins.commands.flirt.lines);
    bot.whisper(player.username, pickupLine);
  },
} as Command;
