import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/utils/redux/store";
import TodoItem from "./todoItem";
import { GetAllTodoThunk } from "@/utils/redux/todo.slice";

const filters = ["All", "Active", "Completed"];

export default function Todos() {
  const dispatch = useDispatch<AppDispatch>();
  const { list, user } = useSelector(({ TodoSlice }: RootState) => TodoSlice);
  const [currentFilter, setCurrentFilter] = useState("All");
  const [searchStr, setSearchStr] = useState("");

  const changeFilter = (newFilter: string) => {
    setCurrentFilter(newFilter);
  };

  const data = useMemo(() => {
    if (searchStr) {
      setCurrentFilter("All");
      return list.filter((item) =>
        item.name?.toLowerCase().includes(searchStr.toLowerCase())
      );
    } else {
      return list
        ? list.filter((todo) => {
            switch (currentFilter) {
              case "All":
                return true;
              case "Active":
                return todo.completed === false;
              case "Completed":
                return todo.completed === true;
              default:
                return true;
            }
          })
        : null;
    }
  }, [list, searchStr, currentFilter]);

  const activeTodos = list?.filter((todo) => todo.completed === false);
  useEffect(() => {
    user && dispatch(GetAllTodoThunk());
    return () => {};
  }, [user]);
  return (
    <div className="w-[90%] md:w-[50%] m-auto bottom-5 relative">
      {list && list.length ? (
        <label className="input input-bordered flex items-center gap-2 my-2">
          <input
            type="text"
            value={searchStr}
            onChange={(e) => setSearchStr(e.target.value)}
            className="grow "
            placeholder="Search"
          />
          <kbd className="kbd kbd-sm">search</kbd>
        </label>
      ) : (
        <></>
      )}
      <div className="rounded-lg overflow-hidden">
        <ul className="flex flex-col gap-[2px]">
          {data && data.length ? (
            data.map((todo) => <TodoItem key={todo._id} todo={todo} />)
          ) : (
            <>
              <li className="font-bold text-center text-xl">No Todos</li>
              <li className="font-thin text-center text-xs">Create new one</li>
            </>
          )}
          <li className="flex items-center px-5 py-4 text-xs justify-between font-bold ">
            <p>{activeTodos?.length} items left</p>
            <div className="items-center hidden md:flex md:gap-5 text-md justify-evenly font-bold">
              {filters.map((filter) => (
                <button
                  key={filter}
                  className={
                    currentFilter === filter
                      ? "text-blue-800"
                      : "hover:text-blue-800"
                  }
                  onClick={() => changeFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </li>
        </ul>
      </div>

      <div className="flex items-center md:hidden px-10 py-4 text-md justify-evenly mt-5 shadow-xl rounded font-bold">
        {filters.map((filter) => (
          <button
            key={filter}
            className={
              currentFilter === filter ? "text-blue-800" : "hover:text-blue-800"
            }
            onClick={() => changeFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}
