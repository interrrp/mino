import * as logger from "~/logger.ts";

export function handleError(error: Error): void {
  if (error.message.includes("unsupported/unknown protocol version")) {
    logger.error(
      "Unsupported protocol version. This is most likely due to the server" +
        " being on a newer version of Minecraft than the bot.",
    );
    return;
  }

  logger.error(error.message);
}
