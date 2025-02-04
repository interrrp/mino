import getMinecraftData from "minecraft-data";
import { Bot } from "mineflayer";
import { Entity } from "prismarine-entity";

import { config } from "~/config.ts";
import { sleep } from "~/utils.ts";

/**
 * This plugin automatically equips armor when it is given to the bot.
 *
 * @param bot The bot.
 */
export default function autoArmorPlugin(bot: Bot): void {
  if (!config.plugins.autoArmor.enabled) return;

  bot.on(
    "playerCollect",
    async (collector, item) => await handlePlayerCollect(bot, collector, item),
  );
}

async function handlePlayerCollect(
  bot: Bot,
  collector: Entity,
  item: Entity,
): Promise<void> {
  if (collector !== bot.entity) return;

  // The last object in the metadata array is the item stack.
  const itemStack = item.metadata[item.metadata.length - 1] as
    | { itemId: number }
    | undefined;
  if (!itemStack) return;

  const itemId = itemStack.itemId;
  const itemName = getMinecraftData(bot.version).items[itemId].name;

  // Let things register, so we wait for a short period of time.
  await sleep(config.plugins.autoArmor.equipDelayMillis);

  if (isArmorItem(itemName)) {
    await activateItem(bot, itemId);
  } else if (isShield(itemName)) {
    await bot.equip(itemId, "off-hand");
  }
}

async function activateItem(bot: Bot, itemId: number): Promise<void> {
  await bot.equip(itemId, "hand");
  bot.activateItem();
}

function isArmorItem(name: string): boolean {
  return (
    name.includes("helmet") ||
    name.includes("chestplate") ||
    name.includes("leggings") ||
    name.includes("boots")
  );
}

function isShield(name: string): boolean {
  return name.includes("shield");
}
