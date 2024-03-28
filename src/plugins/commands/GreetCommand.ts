import { findPlayer } from "../../utils/minecraft";
import Command from "./Command";

/**
 * This command greets a player.
 */
export default class GreetCommand extends Command {
  name = "greet";
  description = "Greets a player.";

  execute(args: string[], sender: string): void {
    const player = findPlayer(this.bot, sender, args[0] ?? "");
    if (!player) return;

    this.bot.chat(`Hello, ${player.username}!`);
  }
}
