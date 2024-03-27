/**
 * @file Contains functions for logging messages to the console.
 */
import chalk from "chalk";

/**
 * Logs a message to the console. Logging functions are typically just a wrapper
 * around this function.
 *
 * @param prefix The prefix of the log message.
 * @param color The color of the prefix.
 * @param message The message to log.
 */
function log(prefix: string, color: chalk.Chalk, message: string) {
  console.log(`${color(prefix)} ${message}`);
}

/**
 * Logs a message to the console with the "info" prefix.
 *
 * @param message The message to log.
 */
export function info(message: string) {
  log("info", chalk.blue, message);
}

/**
 * Logs a message to the console with the "warn" prefix.
 *
 * @param message The message to log.
 */
export function warn(message: string) {
  log("warn", chalk.yellow, message);
}

/**
 * Logs a message to the console with the "error" prefix.
 *
 * @param message The message to log.
 */
export function error(message: string) {
  log("error", chalk.red, message);
}

export default { info, warn, error };
