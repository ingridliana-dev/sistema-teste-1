import { type Express } from "express";
import { createServer } from "http";
import { professorsRouter } from "./professors";

export function registerRoutes(app: Express) {
  // Registra as rotas da API
  app.use("/api", professorsRouter);

  // Retorna o servidor HTTP
  return createServer(app);
}
