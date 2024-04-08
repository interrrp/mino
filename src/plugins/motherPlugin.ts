/**
 * mineflayer-mother - A plugin for mineflayer that makes your bot do MLG.
 *
 * @author MakkusuOtaku <https://github.com/MakkusuOtaku>
 */
import config from "config";

import getMinecraftData from "minecraft-data";
import mineflayer from "mineflayer";
import vec3 from "vec3";

import { sleep } from "@/utils/common";

type BoatType = "oak_boat" | "spruce_boat" | "birch_boat" | "jungle_boat" | "acacia_boat" | "dark_oak_boat";
type MlgBlockType = "water_bucket" | "slime_block" | "sweet_berries" | "cobweb" | "web" | "hay_block";
type VehicleType = "Boat" | "Donkey" | "Horse" | "Minecart";

export type MotherOptions = {
  boats: BoatType[];
  keepBucket: boolean;
  maxVelocity: number;
  mlgBlocks: MlgBlockType[];
  vehicles: VehicleType[];
};

export default function motherPlugin(bot: mineflayer.Bot) {
  bot.mother = { ...(config.plugins.mother as MotherOptions), doingMLG: false };
  bot.mother.doingMLG = false;

  bot.on("move", async () => {
    if (bot.entity.velocity.y < -bot.mother.maxVelocity) {
      mlg(bot);
    } else if (bot.mother.doingMLG) {
      bot.mother.doingMLG = false;
      if (bot.mother.keepBucket) {
        const waterBlock = bot.findBlock({
          matching: [getMinecraftData(bot.version).blocksByName["water"].id],
          maxDistance: 6,
        });
        if (!waterBlock) return;
        await bot.lookAt(waterBlock.position, true);
        await bot.activateItem();
      }
    }
  });
}

async function mlg(bot: mineflayer.Bot) {
  bot.mother.doingMLG = true;

  const neighbour = bot.nearestEntity();
  if (
    neighbour &&
    bot.mother.vehicles.includes(neighbour.displayName as VehicleType) &&
    bot.entity.position.distanceTo(neighbour.position) < 6
  ) {
    bot.mount(neighbour);
    await sleep(100);
    bot.dismount();
    return;
  }

  try {
    for (const item of bot.inventory.slots) {
      if (item && bot.mother.mlgBlocks.includes(item.name as MlgBlockType)) {
        await bot.equip(item.type, "hand");
        break;
      }
    }

    await bot.look(bot.entity.yaw, -Math.PI / 2, true);
    const reference = bot.blockAtCursor(5);
    if (reference && bot.heldItem) {
      if (bot.heldItem.name.endsWith("_bucket") || bot.mother.boats.includes(bot.heldItem.name as BoatType))
        await bot.activateItem();
      else await bot.placeBlock(reference, vec3(0, 1, 0));
    }
    bot.look(bot.entity.yaw, 0);
  } catch (err) {
    console.log(err);
  }
}
