import config from "../../../qbot.config.json";

import { Command } from ".";
import { randomItem } from "../../utils/common";
import { findPlayer } from "../../utils/minecraft";

export default {
  name: "flirt",
  description: "Flirt with a player.",
  execute(bot, args, sender) {
    const player = findPlayer(bot, sender, args[0] ?? "");
    if (!player) return;

    const pickupLine = randomItem(config.plugins.commands.flirt.lines);
    bot.whisper(player.username, pickupLine);
  },
} as Command;
