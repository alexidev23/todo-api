import { pool } from "../db.js";

const db = pool.promise();

/**
 * GET /api-todo
 * Obtener todas las tareas
 */
export async function getTodos(req, res) {
  try {
    const [rows] = await db.query("SELECT * FROM todos");
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Error al obtener todos" });
  }
}

/**
 * POST /api-todo
 * Crear nueva tarea
 */
export async function addTodo(req, res) {
  try {
    const { text, completed } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({ success: false, error: "El campo 'text' es obligatorio" });
    }

    const [result] = await db.query(
      "INSERT INTO todos (text, completed) VALUES (?, ?)",
      [text, completed ?? false]
    );

    res.status(201).json({
      success: true,
      data: { id: result.insertId, text, completed: completed ?? false },
    });
  } catch (err) {
    console.error(err);
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

    if (!text || text.trim() === "") {
      return res.status(400).json({ success: false, error: "El campo 'text' es obligatorio" });
    }

    const [result] = await db.query(
      "UPDATE todos SET text = ?, completed = ? WHERE id = ?",
      [text, completed ?? false, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: "Tarea no encontrada" });
    }

    res.json({ success: true, data: { id, text, completed: completed ?? false } });
  } catch (err) {
    console.error(err);
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
    console.error(err);
    res.status(500).json({ success: false, error: "Error al eliminar la tarea" });
  }
}
