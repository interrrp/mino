import { Command } from "@/plugins/commands";

export default {
  name: "unfight",
  aliases: ["stop-fighting", "unpvp"],
  description: "Stops fighting.",
  execute(bot) {
    bot.pvp.stopFighting();
  },
} as Command;
