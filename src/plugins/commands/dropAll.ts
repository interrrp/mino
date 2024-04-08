import config from "config";

import { Command } from "@/plugins/commands";
import { sleep } from "@/utils/common";

export default {
  name: "drop-all",
  aliases: ["clear"],
  description: "Drops all items in the inventory.",
  async execute(bot) {
    for (const item in bot.inventory.slots) {
      const itemStack = bot.inventory.slots[item];
      if (itemStack) {
        await bot.tossStack(itemStack);
        await sleep(config.plugins.commands.dropAll.delay);
      }
    }
  },
} as Command;
