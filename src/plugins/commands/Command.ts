import { Bot } from "mineflayer";

/**
 * The base class for all commands.
 */
export default abstract class Command {
  /**
   * The name of the command.
   */
  name: string = "";

  /**
   * The description of the command.
   */
  description: string = "";

  /**
   * The bot.
   */
  protected bot: Bot;

  /**
   * Creates a new instance of the command.
   *
   * @param bot The bot.
   */
  constructor(bot: Bot) {
    this.bot = bot;
  }

  /**
   * Executes the command.
   *
   * @param args The arguments passed to the command.
   * @param sender The username of who executed the command.
   */
  abstract execute(args: string[], sender: string): void | Promise<void>;
}
