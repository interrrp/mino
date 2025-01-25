import { Command } from "~/plugins/commands/index.ts";

export default {
  name: "where",
  aliases: ["pos", "position", "loc", "location"],
  description: "Tells you where the bot is.",
  execute(bot, _, sender) {
    const pos = bot.entity.position;
    bot.whisper(
      sender,
      `I am at ${Math.round(pos.x)} ${Math.round(pos.y)} ${Math.round(pos.z)}`,
    );
  },
} as Command;
