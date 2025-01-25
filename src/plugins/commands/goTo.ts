import { config } from "~/config.ts";

import { goals } from "mineflayer-pathfinder";

import { Command } from "~/plugins/commands/index.ts";
import { findPlayer } from "~/utils.ts";

export default {
  name: "go-to",
  aliases: ["go", "goto"],
  description: "Goes to a player.",
  execute(bot, args, sender) {
    const target = findPlayer(bot, sender, args[0] ?? "");
    if (!target || !target.entity) return;

    bot.pathfinder.setGoal(
      new goals.GoalFollow(target.entity, config.plugins.commands.goTo.rangeBlocks),
    );
  },
} as Command;
