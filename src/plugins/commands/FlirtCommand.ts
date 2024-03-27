import config from "../../../qbot.config.json";

import { randomItem } from "../../utils/common";
import { findPlayer } from "../../utils/minecraft";
import Command from "./Command";

export default class FlirtCommand extends Command {
  name: string = "flirt";
  description: string = "Flirt with a player.";

  execute(args: string[], sender: string): void {
    const player = findPlayer(this.bot, sender, args[0] ?? "");
    if (!player) return;

    const pickupLine = randomItem(config.plugins.commands.flirt.lines);
    this.bot.whisper(player.username, pickupLine);
  }
}
