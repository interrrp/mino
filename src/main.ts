import { config } from "~/config.ts";

import { startBot } from "~/bot.ts";

console.clear();
console.log(
  `%cMino %con %c${config.server.host} (${config.server.version})\n`,
  "color: blue",
  "color: gray",
  "color: blue",
);

startBot();
