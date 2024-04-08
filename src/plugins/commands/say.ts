import { Command } from "@/plugins/commands";

export default {
  name: "say",
  aliases: ["echo"],
  description: "Makes me say whatever you want.",
  execute(bot, args) {
    bot.chat(args.join(" "));
  },
} as Command;
