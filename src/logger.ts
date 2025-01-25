/**
 * Logs a message to the console. Logging functions are typically just a wrapper
 * around this function.
 *
 * @param prefix The prefix of the log message.
 * @param color The color of the prefix.
 * @param message The message to log.
 */
function log(prefix: string, color: string, message: string) {
  console.log(`%c${prefix} %c${message}`, `color: ${color}`, "color: inherit");
}

/**
 * Logs a message to the console with the "info" prefix.
 * @param message The message to log.
 */
export function info(message: string) {
  log("info", "blue", message);
}

/**
 * Logs a message to the console with the "warn" prefix.
 * @param message The message to log.
 */
export function warn(message: string) {
  log("warn", "yellow", message);
}

/**
 * Logs a message to the console with the "error" prefix.
 * @param message The message to log.
 */
export function error(message: string) {
  log("error", "red", message);
}
