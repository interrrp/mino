import { Entity } from "prismarine-entity";

import { Command } from ".";
import { findPlayer } from "../../utils/minecraft";

export default {
  name: "fight",
  description: "Fight a player.",
  async execute(bot, args, sender) {
    // Don't target the bot itself
    args = args.filter((v) => v !== bot.username && v !== "you");

    if (args.length === 0) {
      await bot.pvp.fight(bot.players[sender].entity);
    } else if (args[0]) {
      const player = findPlayer(bot, sender, args[0]);
      if (player) bot.pvp.fight(player.entity);
    } else {
      const targets = args
        .map((ref) => findPlayer(bot, sender, ref)?.entity)
        .filter((ent): ent is Entity => ent !== undefined);
      await bot.pvp.fight(targets);
    }
  },
} as Command;
