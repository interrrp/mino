import { findPlayer } from "../../utils/minecraft";
import Command from "./Command";

export default class UnfightCommand extends Command {
  name: string = "unfight";
  description: string = "Stops fighting.";

  execute(args: string[], sender: string): void {
    const player = findPlayer(this.bot, sender, args[0] ?? "");
    if (!player) return;

    this.bot.pvp.stopFighting();
  }
}
