import express from "express";
import { getTodos, addTodo, updateTodo, deleteTodo } from "../controllers/todoController.js";

const router = express.Router();

router.get("/", getTodos);
router.post("/newtodo", addTodo);
router.put("/todo/:id", updateTodo);
router.delete("/todo/:id", deleteTodo);

export default router;
