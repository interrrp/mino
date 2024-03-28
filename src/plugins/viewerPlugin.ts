import config from "../../qbot.config.json";

import { Bot } from "mineflayer";
import { mineflayer as startMineflayerViewer } from "prismarine-viewer";

import logger from "../logger";

/**
 * Allows you to view the world in a web interface.
 *
 * @param bot The bot.
 */
export default function viewerPlugin(bot: Bot): void {
  if (!config.plugins.viewer.enabled) return;

  logger.info(`Starting viewer at http://localhost:${config.plugins.viewer.port}`);
  startMineflayerViewer(bot, config.plugins.viewer);
}
