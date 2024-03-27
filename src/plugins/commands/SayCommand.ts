import Command from "./Command";

export default class SayCommand extends Command {
  name = "say";
  description = "Makes me say whatever you want.";

  execute(args: string[]): void | Promise<void> {
    this.bot.chat(args.join(" "));
  }
}
