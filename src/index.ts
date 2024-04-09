import config from "config";

import chalk from "chalk";

import startBot from "@/startBot";

async function main() {
  console.clear();
  printBanner();

  await startBot();
}

function printBanner(): void {
  const name = chalk.blue("Mino");
  const on = chalk.gray("on");
  const server = chalk.blue(config.server.host);
  const version = chalk.gray(config.server.version);

  console.log(`| ${name} ${on} ${server} (${version})\n`);
}

main();
