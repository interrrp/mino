# ⛏️🤖 qBot - A customizable Minecraft bot

> Built upon `mineflayer`, qBot is written in
> [TypeScript](https://www.typescriptlang.org/) with a well-documented codebase

## 🔥 Prerequisites

This project depends on some software, notably:

- [Node.js](https://nodejs.org)
- [PNPM](https://pnpm.io/)
  > To install `pnpm`, simply do `npm i -g pnpm`

## ⬆️ Usage

To give qBot a try, clone this repository, adjust the
[configuration file](qbot.config.json) to your preferences, and start the bot:

```sh
git clone https://github.com/interrrp/qbot
# ^ Edit configuration after this step

# Install dependencies
pnpm i

# Start the bot
pnpm start
```

## 🧑‍💻 Contributing

Simply create a pull request! However, there are some guidelines you must
follow:

- Code must work (please, this should be common sense.)
- All functions should be documented
- Lint your code using [ESLint](https://eslint.org) (`pnpm exec eslint .`)
- Format your code using [Prettier](https://prettier.io/) (`pnpm exec prettier --write .`)

## 🔑 License

This project is licensed under [GPLv3](https://www.gnu.org/licenses/gpl-3.0.en.html).
