import Command from "./Command";
import { sleep } from "../../utils/common";

import config from "../../../qbot.config.json";

export default class DropAllCommand extends Command {
  name: string = "drop-all";
  description: string = "Drops all items in the inventory.";

  async execute(args: string[], sender: string): Promise<void> {
    for (const item in this.bot.inventory.slots) {
      const itemStack = this.bot.inventory.slots[item];
      if (itemStack) {
        await this.bot.tossStack(itemStack);
        await sleep(config.plugins.commands.dropAll.delay);
      }
    }
  }
}
