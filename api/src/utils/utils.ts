import { Environment } from "./types";

export function getEnvironment(): string {
  const nodeEnvironment =
    process.env.API_NODE_ENVIRONMENT || Environment.Development;
  return nodeEnvironment;
}
