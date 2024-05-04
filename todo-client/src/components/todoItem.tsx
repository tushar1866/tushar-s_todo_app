import React from "react";
import { useDispatch } from "react-redux";
import {
  Todo,
  DeleteTodoThunk,
  UpdateTodoThunk,
} from "@/utils/redux/todo.slice";
import { AppDispatch } from "@/utils/redux/store";

type TodoItemProps = {
  todo: Todo;
};
function TodoItem({ todo }: TodoItemProps) {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <li
      key={todo._id}
      className="flex items-center px-3 py-4 :forest:hover:bg-neutral "
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() =>
          dispatch(UpdateTodoThunk({ ...todo, completed: !todo.completed }))
        }
        className="checkbox"
      />
      <p
        className={
          todo.completed
            ? "pl-3 text-sm font-bold line-through"
            : "pl-3 text-sm font-bold"
        }
      >
        {todo.name}
      </p>
      <button
        className="btn btn-circle btn-xs btn-outline ml-auto"
        onClick={() => dispatch(DeleteTodoThunk(todo))}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </li>
  );
}

export default TodoItem;
