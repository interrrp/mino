import { Entity } from "prismarine-entity";

import { Command } from ".";
import { findPlayer } from "../../utils/minecraft";

export default {
  name: "fight",
  description: "Fight a player.",
  async execute(bot, args, sender) {
    // Don't target the bot itself
    args = args.filter((arg) => arg !== bot.username && arg !== "you");

    const senderEntity = bot.players[sender].entity;
    if (args.length === 0) {
      await bot.pvp.fight(senderEntity);
      return;
    }

    const targets = args
      .map((ref) => findPlayer(bot, sender, ref)?.entity)
      .filter((ent): ent is Entity => ent !== undefined);
    await bot.pvp.fight(targets);
  },
} as Command;
