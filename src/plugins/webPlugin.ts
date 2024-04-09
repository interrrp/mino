import config from "config";

import http from "node:http";

import express from "express";
import { Bot } from "mineflayer";
import { Server as IoServer } from "socket.io";

import logger from "@/logger";

/**
 * Adds a web interface to the bot.
 * @param bot The bot.
 */
export default function webPlugin(bot: Bot): void {
  if (!config.plugins.web.enabled) return;

  const app = express();
  const server = http.createServer(app);
  const io = new IoServer(server);

  bot.on("end", () => {
    server.close();
  });

  app.use(express.static("./dist/web"));

  bot.on("chat", (username, message) => {
    io.emit("message", { username, message });
  });

  io.on("connection", (socket) => {
    socket.on("message", bot.chat);
  });

  const port = config.plugins.web.port;
  server.listen(port, () => logger.info(`Web interface listening on http://localhost:${port}`));
}
