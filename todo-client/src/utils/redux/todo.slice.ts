"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosInstance } from "../axios";

export type Todo = {
  _id?: string;
  name?: string;
  completed?: boolean;
};
export type User = {
  _id?: string;
  name?: string;
  email?: string;
};

export type TodoState = {
  list: Todo[];
  saved: Todo[];
  user: User | undefined;
  token: string | null;
};

const initialState: TodoState = {
  list: [],
  saved: JSON.parse(
    (typeof window !== "undefined" && localStorage.getItem("saved")) || "[]"
  ),
  user: undefined,
  token: typeof window !== "undefined" ? sessionStorage.getItem("token") : "",
};

export const GetUserThunk = createAsyncThunk<{ user: User }>(
  "GetUserThunk",
  async (data) => {
    try {
      const result = await AxiosInstance.get("/user");
      if (result.status === 200) {
        return result.data;
      } else {
        throw Error(result.data);
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  }
);
export const ManageUserThunk = createAsyncThunk<
  { user: User; token: string },
  User | undefined
>("ManageUserThunk", async (data) => {
  try {
    const result = await AxiosInstance.post("/manage-user", data);
    if (result.status === 200) {
      return result.data;
    } else {
      throw Error(result.data);
    }
  } catch (error) {
    console.error(error);
    return error;
  }
});

export const AddTodoThunk = createAsyncThunk<
  { todo: Todo; todos: Todo[] },
  Todo
>("AddTodoThunk", async (data) => {
  try {
    const result = await AxiosInstance.post("/add-todo", data);
    if (result.status === 201) {
      return result.data;
    } else {
      throw Error(result.data);
    }
  } catch (error) {
    console.error(error);
    return error;
  }
});
export const GetAllTodoThunk = createAsyncThunk<{ todo: Todo; todos: Todo[] }>(
  "GetAllTodoThunk",
  async (data) => {
    try {
      const result = await AxiosInstance.get("/todos");
      if (result.status === 200) {
        return result.data;
      } else {
        throw Error(result.data);
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  }
);
export const UpdateTodoThunk = createAsyncThunk<
  { todo: Todo; todos: Todo[] },
  Todo
>("UpdateTodoThunk", async (data) => {
  try {
    const result = await AxiosInstance.put(`/edit-todo/${data?._id}`, data);
    if (result.status === 200) {
      return result.data;
    } else {
      throw Error(result.data);
    }
  } catch (error) {
    console.error(error);
    return error;
  }
});
export const DeleteTodoThunk = createAsyncThunk<
  { todo: Todo; todos: Todo[] },
  Todo
>("DeleteTodoThunk", async ({ _id }) => {
  try {
    const result = await AxiosInstance.delete(`/delete-todo/${_id}`);
    if (result.status === 200) {
      return result.data;
    } else {
      throw Error(result.data);
    }
  } catch (error) {
    console.error(error);
    return error;
  }
});
export const todo = createSlice({
  name: "todo",
  initialState,
  reducers: {
    removeSession: (state) => {
      typeof window !== "undefined" && sessionStorage.removeItem("token");
      state.user = undefined;
      state.token = null;
      state.list = [];
    },
    saveTodo: (state, action) => {
      const prevSaved = JSON.parse(
        (typeof window !== "undefined" && localStorage.getItem("saved")) || "[]"
      );
      const allSaved = prevSaved.push(action.payload);
      typeof window !== "undefined" &&
        localStorage.setItem("saved", JSON.stringify(allSaved));
      state.saved = allSaved;
    },
    removeSaved: (state, action) => {
      const prevSaved = [...state.saved];
      const index = prevSaved.findIndex(
        (item) => item._id === action.payload._id
      );
      const allSaved = prevSaved.splice(index, 1);
      typeof window !== "undefined" &&
        localStorage.setItem("saved", JSON.stringify(allSaved));
      state.saved = allSaved;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetUserThunk.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
    builder.addCase(ManageUserThunk.fulfilled, (state, action) => {
      sessionStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.user = action.payload.user;
    });
    builder.addCase(AddTodoThunk.fulfilled, (state, action) => {
      console.log("result Payload", JSON.stringify(action.payload));
      let tempTodos = action.payload.todos;
      state.list = tempTodos;
    });
    builder.addCase(GetAllTodoThunk.fulfilled, (state, action) => {
      state.list = action.payload.todos;
    });
    builder.addCase(UpdateTodoThunk.fulfilled, (state, action) => {
      let index = state.list.findIndex(
        (item) => item._id === action.payload.todo._id
      );
      state.list[index] = action.payload.todo;
    });
    builder.addCase(DeleteTodoThunk.fulfilled, (state, action) => {
      let index = state.list.findIndex(
        (item) => item._id === action.payload.todo._id
      );
      state.list.splice(index, 1);
    });
  },
});

export const { saveTodo, removeSaved, removeSession } = todo.actions;
export default todo.reducer;
