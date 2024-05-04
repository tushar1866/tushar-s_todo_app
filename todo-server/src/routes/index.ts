import { Router } from "express";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todos/todo";
import { getUser, manageUser } from "../controllers/users/user";
import { authenticate } from "./authmiddleware";

const router: Router = Router();

router.get("/todos", authenticate, getTodos);

router.post("/add-todo", authenticate, addTodo);

router.put("/edit-todo/:id", authenticate, updateTodo);

router.delete("/delete-todo/:id", authenticate, deleteTodo);

router.post("/manage-user", manageUser);
router.get("/user", authenticate, getUser);
export default router;
