import config from "../../../qbot.config.json";

import { Bot } from "mineflayer";

import CommandManager from "./CommandManager";
import DropAllCommand from "./DropAllCommand";
import FightCommand from "./FightCommand";
import FlirtCommand from "./FlirtCommand";
import GoToCommand from "./GoToCommand";
import GreetCommand from "./GreetCommand";
import SayCommand from "./SayCommand";
import UnfightCommand from "./UnfightCommand";
import WhereCommand from "./WhereCommand";

export default class CommandsPlugin {
  commandManager: CommandManager;

  private bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
    this.bot.commands = this;

    this.commandManager = new CommandManager(bot);

    this.registerChatHandler();
    this.registerAllCommands();
  }

  static register(bot: Bot): void {
    new CommandsPlugin(bot);
  }

  private registerAllCommands(): void {
    this.commandManager.addCommand(GreetCommand);
    this.commandManager.addCommand(FightCommand);
    this.commandManager.addCommand(UnfightCommand);
    this.commandManager.addCommand(DropAllCommand);
    this.commandManager.addCommand(GoToCommand);
    this.commandManager.addCommand(WhereCommand);
    this.commandManager.addCommand(FlirtCommand);
    this.commandManager.addCommand(SayCommand);
  }

  private registerChatHandler(): void {
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
