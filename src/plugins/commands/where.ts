import { Command } from ".";

export default {
  name: "where",
  description: "Tells you where the bot is.",
  execute(bot, args, sender) {
    const pos = bot.entity.position;
    bot.whisper(sender, `I am at ${Math.round(pos.x)} ${Math.round(pos.y)} ${Math.round(pos.z)}`);
  },
} as Command;
