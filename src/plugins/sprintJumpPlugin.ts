import { Bot } from "mineflayer";

export default function sprintJumpPlugin(bot: Bot): void {
  bot.on("physicsTick", () => {
    bot.setControlState("jump", bot.getControlState("sprint"));
  });
}
