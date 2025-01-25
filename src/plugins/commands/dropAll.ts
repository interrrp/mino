import { config } from "~/config.ts";

import { Command } from "~/plugins/commands/index.ts";
import { sleep } from "~/utils.ts";

export default {
  name: "drop-all",
  aliases: ["clear"],
  description: "Drops all items in the inventory.",
  async execute(bot) {
    for (const item in bot.inventory.slots) {
      const itemStack = bot.inventory.slots[item];
      if (itemStack) {
        await bot.tossStack(itemStack);
        await sleep(config.plugins.commands.dropAll.delayMillis);
      }
    }
  },
} as Command;
