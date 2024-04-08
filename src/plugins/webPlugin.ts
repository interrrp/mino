import config from "../../qbot.config.json";

import express from "express";
import expressWs from "express-ws";
import { Bot } from "mineflayer";

import logger from "../logger";

/**
 * Adds a web interface to the bot.
 * @param bot The bot.
 */
export default function webPlugin(bot: Bot): void {
  if (!config.plugins.web.enabled) return;

  const router = expressWs(express()).app;

  router.use(express.static("web"));

  router.ws("/chat", (ws) => {
    ws.on("message", bot.chat);
    bot.on("chat", (username, message) => ws.send(`${username}: ${message}`));
  });

  const port = config.plugins.web.port;
  router.listen(port, () => logger.info(`Web interface listening on http://localhost:${port}`));
}
