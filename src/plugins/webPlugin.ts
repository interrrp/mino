import config from "config";

import express from "express";
import expressWs from "express-ws";
import { Bot } from "mineflayer";

import logger from "@/logger";

/**
 * Adds a web interface to the bot.
 * @param bot The bot.
 */
export default function webPlugin(bot: Bot): void {
  if (!config.plugins.web.enabled) return;

  const router = expressWs(express()).app;

  router.use(express.static("web/dist"));

  router.ws("/chat", (ws) => {
    ws.on("message", bot.chat);

    function chatHandler(username: string, message: string) {
      ws.send(`${username}: ${message}`);
    }
    bot.on("chat", chatHandler);
    ws.on("close", () => bot.removeListener("chat", chatHandler));
  });

  const port = config.plugins.web.port;
  router.listen(port, () => logger.info(`Web interface listening on http://localhost:${port}`));
}
