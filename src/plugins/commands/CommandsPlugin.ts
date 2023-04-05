import { Bot } from "mineflayer";

import CommandManager from "./CommandManager";
import GreetCommand from "./GreetCommand";
import FightCommand from "./FightCommand";
import UnfightCommand from "./UnfightCommand";
import DropAllCommand from "./DropAllCommand";
import GoToCommand from "./GoToCommand";
import WhereCommand from "./WhereCommand";
import FlirtCommand from "./FlirtCommand";

import config from "../../../qbot.config.json";

/**
 * This plugin adds a command system to the bot.
 */
export default class CommandsPlugin {
  /**
   * The command manager.
   */
  commandManager: CommandManager;

  /**
   * The bot.
   */
  private bot: Bot;

  /**
   * Creates a new instance of the plugin.
   *
   * @param bot The bot.
   */
  constructor(bot: Bot) {
    this.bot = bot;
    this.bot.commands = this;

    this.commandManager = new CommandManager(bot);

    this.registerEventHandler();
    this.registerAllCommands();
  }

  /**
   * Registers the plugin to the bot.
   *
   * @param bot The bot.
   */
  static register(bot: Bot): void {
    new CommandsPlugin(bot);
  }

  /**
   * Registers all commands.
   */
  private registerAllCommands(): void {
    this.commandManager.addCommand(GreetCommand);
    this.commandManager.addCommand(FightCommand);
    this.commandManager.addCommand(UnfightCommand);
    this.commandManager.addCommand(DropAllCommand);
    this.commandManager.addCommand(GoToCommand);
    this.commandManager.addCommand(WhereCommand);
    this.commandManager.addCommand(FlirtCommand);
  }

  /**
   * Registers the chat event handler to the bot, since commands are executed
   * through chat.
   */
  private registerEventHandler(): void {
    const handler = (username: string, message: string) => {
      if (username === this.bot.username) {
        return;
      }

      message = message.replace(config.plugins.commands.prefix, "");

      const args = message.split(" ");
      const command = this.commandManager.findCommandByName(args[0]);
      if (command) {
        command.execute(args.slice(1), username);
      }
    };

    this.bot.on("chat", handler);
    this.bot.on("whisper", handler);
  }
}
