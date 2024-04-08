import { Command } from "@/plugins/commands";
import { findPlayer } from "@/utils/minecraft";

export default {
  name: "unfight",
  aliases: ["stop-fighting", "unpvp"],
  description: "Stops fighting.",
  execute(bot, args, sender) {
    const player = findPlayer(bot, sender, args[0] ?? "");
    if (player) bot.pvp.stopFighting();
  },
} as Command;
