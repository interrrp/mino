import { Command } from "~/plugins/commands/index.ts";
import { findPlayer } from "~/utils.ts";

export default {
  name: "greet",
  description: "Greets a player.",
  execute(bot, args, sender) {
    const player = findPlayer(bot, sender, args[0] ?? "");
    if (player) bot.chat(`Hello, ${player.username}!`);
  },
} as Command;
