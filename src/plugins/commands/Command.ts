import { Bot } from "mineflayer";

/**
 * The base class for all commands.
 */
export default abstract class Command {
  abstract readonly name: string;
  abstract readonly description: string;

  protected bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  abstract execute(args: string[], sender: string): void | Promise<void>;
}
