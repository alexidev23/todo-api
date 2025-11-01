import { pool } from "../db.js";

const db = pool.promise();

export async function getTodos(req, res) {
  try {
    const [rows] = await db.query("SELECT * FROM todos");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export async function addTodo(req, res) {
  try {
    const { text, completed } = req.body;
    const [result] = await db.query(
      "INSERT INTO todos (text, completed) VALUES (?, ?)",
      [text, completed || false]
    );
    res.json({ id: result.insertId, text, completed: completed || false });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export async function updateTodo(req, res) {
  try {
    const { id } = req.params;
    const { text, completed } = req.body;
    await db.query(
      "UPDATE todos SET text = ?, completed = ? WHERE id = ?",
      [text, completed, id]
    );
    res.json({ id, text, completed });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteTodo(req, res) {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM todos WHERE id = ?", [id]);
    res.json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

