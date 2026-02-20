import type { Express } from "express";
import type { Server } from "http";
import { getPacksContentSets } from "./api/packsContentSets.js";
import { getStylesGroups } from "./api/stylesGroups.js";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/packs/content-sets", getPacksContentSets);
  app.get("/api/styles/groups", getStylesGroups);

  return httpServer;
}
