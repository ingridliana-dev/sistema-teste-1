import express from "express";
import cors from "cors";
import { professorsRouter } from "./routes/professors";
import { checkDatabaseConnection } from "./db";
import { initSupabase } from "./supabase";

const app = express();
const port = process.env.PORT || 3001;

// Middleware para processar JSON
app.use(express.json());

// Configuração do CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://sistema-teste-1.vercel.app'] 
    : ['http://localhost:3000'],
  credentials: true
}));

// Rotas da API
app.use("/api", professorsRouter);

// Rota de healthcheck
app.get("/api/health", async (_req, res) => {
  try {
    const isDbConnected = await checkDatabaseConnection();
    
    if (!isDbConnected) {
      res.status(500).json({ 
        status: "error",
        message: "Database connection failed" 
      });
      return;
    }

    res.json({ 
      status: "healthy",
      database: "connected"
    });
  } catch (error) {
    console.error("Health check error:", error);
    res.status(500).json({ 
      status: "error",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

// Inicializa o banco de dados antes de iniciar o servidor
initSupabase().then((success) => {
  if (success) {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } else {
    console.error("Failed to initialize Supabase database");
    process.exit(1);
  }
}).catch((error) => {
  console.error("Error initializing Supabase:", error);
  process.exit(1);
});
