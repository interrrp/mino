import { Bot } from "mineflayer";
import Manager from "../../Manager";
import Command from "./Command";

/**
 * Manages commands.
 */
export default class CommandManager extends Manager<Command> {
  /**
   * The bot.
   */
  private bot: Bot;

  /**
   * Creates a new instance of the command manager.
   *
   * @param bot The bot.
   */
  constructor(bot: Bot) {
    super();

    this.bot = bot;
  }

  /**
   * Adds a command to the manager. There is no need to instantiate the command,
   * simply pass the class.
   *
   * @param command The command type to add.
   */
  addCommand(command: new (bot: Bot) => Command): void {
    this.add(new command(this.bot));
  }

  /**
   * Finds a command by its name.
   *
   * @param name The name of the command.
   * @returns The command with the specified name, or null if it doesn't exist.
   */
  findCommandByName(name: string): Command | null {
    return this.items.find((c) => c.name === name) ?? null;
  }
}
