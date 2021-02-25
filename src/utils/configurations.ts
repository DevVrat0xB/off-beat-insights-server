// loading environment variables file.
import DOTENV from "dotenv";

export function getEnvironmentVariables(): { url: string; port: number } {
  DOTENV.config();

  // loading the environment type.
  const ENV: string | undefined = process.env.NODE_ENV;

  // loading the variables according to the environment.
  if (ENV === "production") {
    const serverName: string = String(process.env.CLOUD_SERVER);
    const serverPort: number = Number(process.env.CLOUD_PORT);
    return { url: serverName, port: serverPort };
  } else {
    const serverName: string = String(process.env.LOCAL_SERVER);
    const serverPort: number = Number(process.env.LOCAL_PORT);
    return { url: serverName, port: serverPort };
  }
}
