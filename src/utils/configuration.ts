import dotenv from "dotenv";
import logger from "./logger";

// loading the configuration file (ie .env).
export default function loadEnvironment() {
  logger.info("Environment Active: " + process.env.NODE_ENV);

  process.env.NODE_ENV === "production" || process.env.NODE_ENV === "cloud"
    ? dotenv.config({ path: ".env" })
    : dotenv.config({ path: ".env.dev" });
}
