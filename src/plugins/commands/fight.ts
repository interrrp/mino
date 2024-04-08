import { Command } from ".";
import { findPlayer } from "../../utils/minecraft";

export default {
  name: "fight",
  description: "Fight a player.",
  async execute(bot, args, sender) {
    if (args.length === 0) {
      await bot.pvp.fight(bot.players[sender].entity);
    } else if (args[0]) {
      const player = findPlayer(bot, sender, args[0]);
      if (!player) return;

      await bot.pvp.fight(player.entity);
    } else {
      for (const username of args) {
        const player = findPlayer(bot, sender, username);
        if (!player) return;

        await bot.pvp.fight(player.entity);
      }
    }
  },
} as Command;
