import Command from "./Command";

export default class WhereCommand extends Command {
  name: string = "where";
  description: string = "Tells you where the bot is.";

  execute(args: string[], sender: string): void {
    const pos = this.bot.entity.position;
    this.bot.whisper(
      sender,
      `I am at ${Math.round(pos.x)} ${Math.round(pos.y)} ${Math.round(pos.z)}`
    );
  }
}
