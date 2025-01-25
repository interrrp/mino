import { parse } from "@std/toml";

export interface Config {
  bot: {
    username: string;
    password: string;
    brand: string;
  };
  swarm: {
    amount: number;
    prefix: number;
  };
  server: {
    host: string;
    port: number;
    version: string;
  };
  plugins: {
    core: {
      reconnectOnKick: {
        enabled: boolean;
        delayMillis: number;
      };
    };
    autoArmor: {
      enabled: boolean;
      equipDelayMillis: number;
    };
    pvp: {
      reachBlocks: number;
      followRangeBlocks: number;
      cooldownsMillis: {
        [key: string]: number;
      };
      critical: {
        chance: number;
        delayMillis: number;
      };
      messages: {
        enabled: boolean;
        win: string[];
        loss: string[];
      };
    };
    mother: {
      keepBucket: boolean;
      maxVelocity: number;
    };
    web: {
      enabled: boolean;
      port: number;
    };
    commands: {
      enabled: boolean;
      prefix: string;
      dropAll: {
        delayMillis: number;
      };
      goTo: {
        rangeBlocks: number;
      };
      flirt: {
        lines: string[];
      };
    };
  };
}

const configText = Deno.readTextFileSync("mino.toml");
export const config = parse(configText) as unknown as Config;
