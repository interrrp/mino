import { findPlayer } from "../../utils/minecraft";
import Command from "./Command";

export default class FightCommand extends Command {
  name = "fight";
  description = "Fight a player.";

  async execute(args: string[], sender: string): Promise<void> {
    if (args.length === 0) {
      await this.bot.pvp.fight(this.bot.players[sender].entity);
    } else if (args[0]) {
      const player = findPlayer(this.bot, sender, args[0]);
      if (!player) return;

      await this.bot.pvp.fight(player.entity);
    } else {
      for (const username of args) {
        const player = findPlayer(this.bot, sender, username);
        if (!player) return;

        await this.bot.pvp.fight(player.entity);
      }
    }
  }
}
