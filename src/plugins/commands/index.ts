import { config } from "~/config.ts";

import fs from "node:fs/promises";

import { Bot } from "mineflayer";

export type Command = {
  name: string;
  aliases: string[] | undefined;
  description: string;
  execute: (bot: Bot, args: string[], sender: string) => void | Promise<void>;
};

export default async function commandsPlugin(bot: Bot): Promise<void> {
  registerChatHandler(bot, await getCommands());
}

async function getCommands(): Promise<Command[]> {
  const commandFiles = await fs.readdir("src/plugins/commands");
  const commands = [];
  for (const file of commandFiles) {
    const modName = file.replace(".ts", "");
    if (modName === "index") continue;
    commands.push((await import(`./${modName}.ts`)).default);
  }
  return commands;
}

function registerChatHandler(bot: Bot, commands: Command[]): void {
  const handler = (username: string, message: string) => {
    if (username === bot.username || !message.startsWith(config.plugins.commands.prefix)) {
      return;
    }

    message = message.replace(config.plugins.commands.prefix, "");

    const args = message.split(" ");
    const command = commands.find(
      (c) => c.name === args[0] || c.aliases?.includes(args[0]),
    );
    if (command) command.execute(bot, args.slice(1), username);
  };

  bot.on("chat", handler);
  bot.on("whisper", handler);
}
