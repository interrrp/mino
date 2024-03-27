import { Bot } from "mineflayer";

import Manager from "../../Manager";
import Command from "./Command";

export default class CommandManager extends Manager<Command> {
  private bot: Bot;

  constructor(bot: Bot) {
    super();

    this.bot = bot;
  }

  /**
   * Adds a command to the manager. Pass the class instead of instantiating the command yourself.
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
   * @returns The command with the specified name, or `undefined` if it doesn't exist.
   */
  findCommandByName(name: string): Command | undefined {
    return this.items.find((c) => c.name === name);
  }
}
