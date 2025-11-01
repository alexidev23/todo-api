import dotenv from "dotenv";
dotenv.config();
import express from "express";
import todoRoutes from "./routes/todo.js";

const app = express();
app.use(express.json());

// Ruta raíz
app.get("/", (req, res) => {
  res.send("¡Servidor Express funcionando!");
});
app.use("/api-todo", todoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
