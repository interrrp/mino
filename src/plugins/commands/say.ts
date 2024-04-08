import { Command } from ".";

export default {
  name: "say",
  aliases: ["echo"],
  description: "Makes me say whatever you want.",
  execute(bot, args) {
    bot.chat(args.join(" "));
  },
} as Command;
