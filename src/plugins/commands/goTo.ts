import config from "../../../qbot.config.json";

import { goals } from "mineflayer-pathfinder";

import { Command } from ".";
import { findPlayer } from "../../utils/minecraft";

export default {
  name: "go-to",
  description: "Goes to a player.",
  execute(bot, args, sender) {
    const target = findPlayer(bot, sender, args[0] ?? "");
    if (!target || !target.entity) return;

    bot.pathfinder.setGoal(new goals.GoalFollow(target.entity, config.plugins.commands.goTo.range));
  },
} as Command;
