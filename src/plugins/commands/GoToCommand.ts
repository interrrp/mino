import { goals } from "mineflayer-pathfinder";

import Command from "./Command";
import { findPlayer } from "../../utils/minecraft";

import config from "../../../qbot.config.json";

export default class GoToCommand extends Command {
  name: string = "go-to";
  description: string = "Goes to a player.";

  execute(args: string[], sender: string): void {
    const target = findPlayer(this.bot, sender, args[0] ?? "");
    if (!target || !target.entity) return;

    this.bot.pathfinder.setGoal(
      new goals.GoalFollow(target.entity, config.plugins.commands.goTo.range)
    );
  }
}
