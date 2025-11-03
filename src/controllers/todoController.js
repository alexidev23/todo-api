import { pool } from "../db.js";

const db = pool;

/**
 * GET /api-todo
 * Obtener todas las tareas
 */
export async function getTodos(req, res) {
  try {
    const [rows] = await db.query("SELECT * FROM todos");

    // Convertir el campo completed (0/1) a booleano
    const todos = rows.map(todo => ({
      ...todo,
      completed: !!todo.completed,
    }));

    res.json({ success: true, data: todos });
  } catch (err) {
    console.error("❌ Error al obtener los todos:", err);
    res.status(500).json({ success: false, error: "Error al obtener los todos" });
  }
}

/**
 * POST /api-todo
 * Crear nueva tarea
 */
export async function addTodo(req, res) {
  try {
    const { text, completed = false } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({ success: false, error: "El campo 'text' es obligatorio" });
    }

    const [result] = await db.query(
      "INSERT INTO todos (text, completed) VALUES (?, ?)",
      [text, completed ? 1 : 0]
    );

    res.status(201).json({
      success: true,
      data: { id: result.insertId, text, completed: !!completed },
    });
  } catch (err) {
    console.error("❌ Error al agregar la tarea:", err);
    res.status(500).json({ success: false, error: "Error al agregar la tarea" });
  }
}

/**
 * PUT /api-todo/:id
 * Actualizar tarea por ID
 */
export async function updateTodo(req, res) {
  try {
    const { id } = req.params;
    const { text, completed } = req.body;

    if (text !== undefined && text.trim() === "") {
      return res.status(400).json({ success: false, error: "El campo 'text' no puede estar vacío" });
    }

    const [result] = await db.query(
      "UPDATE todos SET text = COALESCE(?, text), completed = COALESCE(?, completed) WHERE id = ?",
      [text ?? null, completed !== undefined ? (completed ? 1 : 0) : null, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: "Tarea no encontrada" });
    }

    res.json({ success: true, data: { id, text, completed: !!completed } });
  } catch (err) {
    console.error("❌ Error al actualizar la tarea:", err);
    res.status(500).json({ success: false, error: "Error al actualizar la tarea" });
  }
}

/**
 * DELETE /api-todo/:id
 * Eliminar tarea por ID
 */
export async function deleteTodo(req, res) {
  try {
    const { id } = req.params;

    const [result] = await db.query("DELETE FROM todos WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: "Tarea no encontrada" });
    }

    res.json({ success: true, message: "Tarea eliminada correctamente" });
  } catch (err) {
    console.error("❌ Error al eliminar la tarea:", err);
    res.status(500).json({ success: false, error: "Error al eliminar la tarea" });
  }
}
