import { Bot } from "mineflayer";
import { Entity } from "prismarine-entity";

import { goals } from "mineflayer-pathfinder";

import config from "../../../qbot.config.json";

/**
 * This plugin is used to add PvP functionality to the bot.
 */
export default class PvpPlugin {
  /**
   * The bot.
   */
  private bot: Bot;

  /**
   * The time in milliseconds that the bot has to wait before attacking again.
   */
  private attackCooldown: number;

  /**
   * The entities that the bot is fighting.
   */
  targets: Entity[] = [];

  /**
   * The entity that the bot is currently fighting.
   */
  currentTarget: Entity | null;

  /**
   * Creates a new instance of the plugin.
   *
   * @param bot The bot.
   */
  constructor(bot: Bot) {
    this.bot = bot;
    this.bot.pvp = this;

    this.attackCooldown = 0;
    this.currentTarget = null;

    this.registerEvents();
  }

  /**
   * Registers the plugin to a bot.
   *
   * @param bot The bot.
   */
  static register(bot: Bot): void {
    new PvpPlugin(bot);
  }

  /**
   * Starts fighting the specified entity.
   *
   * @param entity The entity/entities to fight.
   */
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

  /**
   * Register events to the bot.
   */
  private registerEvents(): void {
    this.bot.on("physicTick", this.handlePhysicTick.bind(this));
    this.bot.on("entityDead", this.handleEntityDead.bind(this));
  }

  /**
   * Handles when the physic tick event is fired.
   */
  private async handlePhysicTick(): Promise<void> {
    if (!this.targets || !this.currentTarget) return;

    this.setCurrentTargetBasedOnDistance();

    const target = this.currentTarget;
    const distanceToTarget = this.bot.entity.position.distanceTo(
      target.position
    );

    if (!this.bot.pathfinder.goal) {
      this.setGoalToTarget();
    }

    if (
      this.bot.pathfinder.goal instanceof goals.GoalFollow &&
      this.bot.pathfinder.goal.entity !== target
    ) {
      this.setGoalToTarget();
    }

    if (distanceToTarget <= config.plugins.pvp.reach) {
      this.bot.lookAt(
        this.currentTarget.position.offset(0, target.height, 0),
        true
      );

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

  /**
   * Handles when an entity dies.
   *
   * @param entity The entity that died.
   */
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

  /**
   * Sets the current target to the closest entity in the `targets` array.
   */
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

  /**
   * Sets the goal to the current target.
   */
  private setGoalToTarget(): void {
    if (!this.currentTarget) return;

    this.bot.pathfinder.setGoal(
      new goals.GoalFollow(this.currentTarget, config.plugins.pvp.followRange)
    );
  }

  /**
   * Checks if the bot has a shield in its offhand.
   *
   * @returns True if the bot has a shield in its offhand, false otherwise.
   */
  private hasShield(): boolean {
    const offhandItem = this.bot.inventory.slots[45];
    if (!offhandItem) return false;

    return offhandItem.name.includes("shield");
  }

  /**
   * Equips the bot with a sword.
   */
  private async equipWeapon(): Promise<void> {
    const weapon = this.bot.inventory.items().find((item) => {
      return item.name.includes("sword");
    });

    if (!weapon) return;

    await this.bot.equip(weapon, "hand");
  }
}
