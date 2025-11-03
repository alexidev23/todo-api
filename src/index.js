import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import todoRoutes from "./routes/todo.js";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());

// 🔐 Configurar CORS
// 🧩 CORS habilitado para tu frontend
app.use(cors({
  origin: ["http://localhost:5173", "https://tu-frontend.vercel.app"], // ambas URLs
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// Rutas
app.get("/", (_, res) => {
  res.status(200).send("✅ Servidor Express funcionando correctamente");
});

app.use("/api/todos", todoRoutes);

// Configuración del puerto
const PORT = process.env.PORT ?? 3000;

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
