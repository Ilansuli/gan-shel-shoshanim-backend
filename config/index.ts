import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

import { prod } from "./prod";
import { dev } from "./dev";

var config: {
  dbURL: string | undefined;
  dbName: string | undefined;
  isGuestMode?: boolean;
};

if (process.env.NODE_ENV === "production") {
  config = prod;
} else {
  console.log(process.env.DB_URL);

  config = dev;
  console.log("config", config);
}

config.isGuestMode = true;

export default config;
