import config from "config";

import http from "node:http";

import express from "express";
import { Bot } from "mineflayer";
import { Server as IoServer, Socket } from "socket.io";

import logger from "@/logger";

const app = express();
const server = http.createServer(app);
const io = new IoServer(server);

app.use(express.static("./dist/web"));

const port = config.plugins.web.port;
server.listen(port, () => logger.info(`Web interface listening on http://localhost:${port}`));

function onChat(username: string, message: string): void {
  io.emit("message", { username, message });
}

function onConnection(socket: Socket, bot: Bot): void {
  socket.on("message", bot.chat);
}

/**
 * Adds a web interface to the bot.
 * @param bot The bot.
 */
export default function webPlugin(bot: Bot): void {
  if (!config.plugins.web.enabled) return;

  const onConnectionWrapper = (socket: Socket) => onConnection(socket, bot);

  bot.on("spawn", () => {
    io.emit("reconnect");
  });
  bot.on("chat", onChat);
  io.on("connection", onConnectionWrapper);
}
