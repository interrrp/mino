import config from "../../../qbot.config.json";

import { sleep } from "../../utils/common";
import Command from "./Command";

export default class DropAllCommand extends Command {
  name: string = "drop-all";
  description: string = "Drops all items in the inventory.";

  async execute(): Promise<void> {
    for (const item in this.bot.inventory.slots) {
      const itemStack = this.bot.inventory.slots[item];
      if (itemStack) {
        await this.bot.tossStack(itemStack);
        await sleep(config.plugins.commands.dropAll.delay);
      }
    }
  }
}
