import config from "../../../qbot.config.json";

import { Bot } from "mineflayer";
import { goals } from "mineflayer-pathfinder";
import { Entity } from "prismarine-entity";

/**
 * This plugin is used to add PvP functionality to the bot.
 */
export default class PvpPlugin {
  private bot: Bot;

  /**
   * The time in milliseconds that the bot has to wait before attacking again.
   */
  private attackCooldown: number;

  targets: Entity[] = [];
  currentTarget: Entity | null;

  constructor(bot: Bot) {
    this.bot = bot;
    this.bot.pvp = this;

    this.attackCooldown = 0;
    this.currentTarget = null;

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
  }

  private registerEvents(): void {
    this.bot.on("physicsTick", this.handlePhysicsTick.bind(this));
    this.bot.on("entityDead", this.handleEntityDead.bind(this));
  }

  private async handlePhysicsTick(): Promise<void> {
    if (!this.targets || !this.currentTarget) return;

    this.setCurrentTargetBasedOnDistance();

    const target = this.currentTarget;
    const distanceToTarget = this.bot.entity.position.distanceTo(target.position);

    if (!this.bot.pathfinder.goal) {
      this.setGoalToTarget();
    }

    if (this.bot.pathfinder.goal instanceof goals.GoalFollow && this.bot.pathfinder.goal.entity !== target) {
      this.setGoalToTarget();
    }

    if (distanceToTarget <= config.plugins.pvp.reach) {
      this.bot.lookAt(this.currentTarget.position.offset(0, target.height, 0), true);

      if (this.attackCooldown <= 0) {
        if (this.hasShield()) {
          this.bot.deactivateItem();
          this.bot.setControlState("sneak", false);
        }

        this.bot.setControlState("jump", true);
        this.bot.attack(this.currentTarget);
        this.attackCooldown = config.plugins.pvp.attackCooldown;
        this.bot.setControlState("jump", false);
      } else {
        this.attackCooldown -= 1;
        this.bot.activateItem(true);
        if (this.hasShield()) {
          this.bot.setControlState("sneak", true);
        }
      }
    }
  }

  private handleEntityDead(entity: Entity): void {
    if (entity === this.bot.entity) {
      this.stopFighting();
      return;
    }

    if (this.targets.includes(entity)) {
      this.targets.splice(this.targets.indexOf(entity), 1);

      if (entity === this.currentTarget) {
        this.currentTarget = null;
      }
    }

    if (this.currentTarget === null || this.targets.length === 0) {
      this.stopFighting();
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

  private setGoalToTarget(): void {
    if (!this.currentTarget) return;

    this.bot.pathfinder.setGoal(new goals.GoalFollow(this.currentTarget, config.plugins.pvp.followRange));
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
