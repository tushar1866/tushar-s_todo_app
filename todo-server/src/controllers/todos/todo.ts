import { Response, Request } from "express";
import { ITodo } from "./../../types/todo";
import Todo from "../../models/todo";
import { UserRequest } from "../../types/user";
const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos: ITodo[] = await Todo.find({
      userId: (req as UserRequest)?.user?._id,
    });
    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: true });
  }
};
const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<ITodo, "name" | "completed">;

    const todo: ITodo = new Todo({
      name: body.name,
      completed: body.completed || false,
      userId: (req as UserRequest)?.user?._id,
    });

    const newTodo: ITodo = await todo.save();
    const allTodos: ITodo[] = await Todo.find({
      userId: (req as UserRequest)?.user?._id,
    });

    res
      .status(201)
      .json({ message: "Todo added", todo: newTodo, todos: allTodos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error: true });
  }
};

const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
      { _id: id },
      body,
      { new: true }
    );
    const allTodos: ITodo[] = await Todo.find({
      userId: (req as UserRequest)?.user?._id,
    });
    res.status(200).json({
      message: "Todo updated",
      todo: updateTodo,
      todos: allTodos,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: true });
  }
};

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTodo: ITodo | null = await Todo.findByIdAndDelete(
      req.params.id
    );
    const allTodos: ITodo[] = await Todo.find({
      userId: (req as UserRequest)?.user?._id,
    });
    res.status(200).json({
      message: "Todo deleted",
      todo: deletedTodo,
      todos: allTodos,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: true });
  }
};

export { getTodos, addTodo, updateTodo, deleteTodo };
