import logger from "./logger";

/**
 * Handles when the bot gets an error.
 *
 * @param error The error.
 */
export default function handleError(error: Error): void {
  // TODO: Possibly move this into an ErrorClassifier class?
  // Also maybe remove the default NodeJS error messages.

  if (error.message.includes("unsupported/unknown protocol version")) {
    logger.error(
      "Unsupported protocol version. This is most likely due to the server" +
        " being on a newer version of Minecraft than the bot."
    );
    return;
  }

  logger.error(error.message);
}
