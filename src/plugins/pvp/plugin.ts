import { config } from "~/config.ts";

import { Bot } from "mineflayer";
import { goals } from "mineflayer-pathfinder";
import { Entity } from "prismarine-entity";
import { Item } from "prismarine-item";

import { randomItem } from "~/utils.ts";

const PVP_CONFIG = config.plugins.pvp;

/**
 * This plugin is used to add PvP functionality to the bot.
 */
export class PvpPlugin {
  private bot: Bot;

  /**
   * The time in milliseconds that the bot has to wait before attacking again.
   */
  private attackCooldown: number = 0;

  strafeDir: "left" | "right" = "left";

  targets: Entity[] = [];
  currentTarget: Entity | null = null;

  constructor(bot: Bot) {
    this.bot = bot;
    this.bot.pvp = this;

    this.registerEvents();
  }

  static register(bot: Bot): void {
    new PvpPlugin(bot);
  }

  async fight(target: Entity | Entity[]): Promise<void> {
    if (Array.isArray(target)) {
      this.targets = target;
    } else {
      this.targets = [target];
    }

    this.currentTarget = this.targets[0];

    this.eatGapple();

    await this.equipWeapon();
  }

  /**
   * Stops fighting the current target. An important note is that this resets
   * pathfinding and will cause the bot to stop moving.
   */
  stopFighting(): void {
    this.targets = [];
    this.currentTarget = null;

    this.bot.pathfinder.setGoal(null);

    this.updateStrafe();
  }

  private registerEvents(): void {
    this.bot.on("physicsTick", this.handlePhysicsTick.bind(this));
    this.bot.on("entityDead", this.handleEntityDead.bind(this));
  }

  private async handlePhysicsTick(): Promise<void> {
    if (!this.targets || !this.currentTarget) return;

    this.setCurrentTargetBasedOnDistance();

    const target = this.currentTarget;
    const distanceToTarget = this.getDistanceToTarget();

    if (
      !this.bot.pathfinder.goal ||
      (this.bot.pathfinder.goal instanceof goals.GoalFollow &&
        this.bot.pathfinder.goal.entity !== target)
    ) {
      this.setGoalToTarget();
    }

    this.updateStrafe();

    if (this.bot.health < 10) {
      this.eatGapple();
    } else if (this.bot.health >= 11) {
      await this.equipWeapon();
    }

    if (distanceToTarget <= PVP_CONFIG.reachBlocks * 2) {
      this.bot.lookAt(target.position.offset(0, target.height, 0), true);

      if (this.attackCooldown <= 0) {
        if (this.hasShield()) {
          this.bot.deactivateItem();
          this.bot.setControlState("sneak", false);
        }

        this.hit(Math.random() < PVP_CONFIG.critical.chance);
      } else {
        this.attackCooldown -= 1;
        this.bot.activateItem(true);
        if (this.hasShield()) {
          this.bot.setControlState("sneak", true);
        }
      }
    } else {
      this.attackCooldown = 0;
    }
  }

  private hit(critical: boolean): void {
    if (!this.currentTarget) return;

    const cooldown = this.getAppropriateCooldown();

    if (!critical) {
      this.attackCooldown = cooldown;
      this.bot.attack(this.currentTarget);
    } else {
      this.bot.setControlState("jump", true);
      this.attackCooldown = cooldown;
      this.bot.waitForTicks(PVP_CONFIG.critical.delayMillis).then(() => {
        if (!this.currentTarget) return;
        this.bot.attack(this.currentTarget);
        this.bot.setControlState("jump", false);
      });
    }

    this.switchStrafeDir();
  }

  private switchStrafeDir(): void {
    this.strafeDir = this.getOppositeStrafeDir();
    this.updateStrafe();
  }

  private getOppositeStrafeDir(): "left" | "right" {
    return this.strafeDir === "left" ? "right" : "left";
  }

  private updateStrafe(): void {
    if (!this.currentTarget || this.getDistanceToTarget() > PVP_CONFIG.reachBlocks) {
      this.bot.setControlState("left", false);
      this.bot.setControlState("right", false);
      return;
    }
    this.bot.setControlState(this.strafeDir, true);
    this.bot.setControlState(this.getOppositeStrafeDir(), false);
  }

  private getAppropriateCooldown(): number {
    const currentItemName = this.bot.heldItem?.name;
    if (!currentItemName) return PVP_CONFIG.cooldownsMillis.other;

    for (const pattern in PVP_CONFIG.cooldownsMillis) {
      if (pattern === "other") continue;

      // @ts-expect-error They exist
      const cooldown = PVP_CONFIG.cooldowns[pattern];

      const patNoAsterisk = pattern.replace("*", "");
      if (
        (pattern.startsWith("*") && currentItemName.endsWith(patNoAsterisk)) ||
        (pattern.endsWith("*") && currentItemName.startsWith(patNoAsterisk))
      ) {
        return cooldown;
      }
    }

    return PVP_CONFIG.cooldownsMillis.other;
  }

  private eatGapple(): void {
    const gapple = this.findGapple();
    if (!gapple) return;
    this.bot.equip(gapple, "hand");
    this.bot.activateItem();
    this.attackCooldown = 100;
    setTimeout(() => {
      this.attackCooldown = this.getAppropriateCooldown();
    }, 1200);
  }

  private findGapple(): Item | null {
    return (
      this.bot.inventory.findInventoryItem(
        // @ts-expect-error findInventoryItem works with string names too
        "enchanted_golden_apple",
        null,
        false,
      ) ||
      // @ts-expect-error findInventoryItem works with string names too
      this.bot.inventory.findInventoryItem("golden_apple", null, false) ||
      null
    );
  }

  private handleEntityDead(entity: Entity): void {
    if (!this.currentTarget) return;

    if (entity === this.bot.entity) {
      this.stopFighting();
      if (PVP_CONFIG.messages.enabled) {
        this.bot.chat(randomItem(PVP_CONFIG.messages.loss));
      }
      return;
    }

    if (this.targets.includes(entity)) {
      this.targets.splice(this.targets.indexOf(entity), 1);

      if (entity === this.currentTarget) {
        this.currentTarget = null;
      }
    }

    if (this.targets.length === 0) {
      this.stopFighting();
      if (PVP_CONFIG.messages.enabled) {
        this.bot.chat(randomItem(PVP_CONFIG.messages.win));
      }
    }
  }

  private setCurrentTargetBasedOnDistance(): void {
    let closestTarget: Entity | null = null;
    let closestDistance: number = 0;

    for (const target of this.targets) {
      const distance = this.bot.entity.position.distanceTo(target.position);

      if (!closestTarget || distance < closestDistance) {
        closestTarget = target;
        closestDistance = distance;
      }
    }

    this.currentTarget = closestTarget;
  }

  private getDistanceToTarget(): number {
    if (!this.currentTarget) return 0;
    return this.bot.entity.position.distanceTo(this.currentTarget.position);
  }

  private setGoalToTarget(): void {
    if (!this.currentTarget) return;

    this.bot.pathfinder.setGoal(
      new goals.GoalFollow(this.currentTarget, PVP_CONFIG.followRangeBlocks),
    );
  }

  private hasShield(): boolean {
    const offhandItem = this.bot.inventory.slots[45];
    if (!offhandItem) return false;

    return offhandItem.name.includes("shield");
  }

  private async equipWeapon(): Promise<void> {
    const weapon = this.bot.inventory.items().find((item) => {
      return item.name.includes("sword");
    });

    if (!weapon) return;

    await this.bot.equip(weapon, "hand");
  }
}
