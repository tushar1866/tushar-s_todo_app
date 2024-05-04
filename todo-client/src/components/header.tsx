import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "@/utils/redux/theme.slice";
import {
  AddTodoThunk,
  GetUserThunk,
  ManageUserThunk,
  removeSession,
  saveTodo,
} from "@/utils/redux/todo.slice";
import moon from "../../public/images/moon.svg";
import sun from "../../public/images/moon.svg";
import { AppDispatch, RootState } from "@/utils/redux/store";

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token } = useSelector((store: RootState) => store.TodoSlice);
  const { theme } = useSelector((store: RootState) => store.ThemeSlice);
  const [value, setValue] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const DialogBox: HTMLDialogElement | undefined =
    typeof window !== "undefined"
      ? (document?.getElementById("my_modal_1") as HTMLDialogElement)
      : undefined;
  const isValidEmail =
    email &&
    email.trim().match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/);

  const toggleMode = () => {
    const action = theme === "light" ? "dark" : "light";
    //console.log(action);
    dispatch(changeTheme(action));
  };

  const handleForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      if (value && value.trim()) dispatch(AddTodoThunk({ name: value.trim() }));
      setValue("");
    } else {
      DialogBox?.showModal();
    }
  };

  const handleUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValidEmail) dispatch(ManageUserThunk({ email }));
    setEmail("");
    DialogBox?.close();
  };
  useEffect(() => {
    dispatch(GetUserThunk());
    return () => {};
  }, []);

  return (
    <div className="py-10">
      <div className="w-[90%] md:w-[50%] m-auto card bg-neutral text-neutral-content py-2 px-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-sm text-white font-bold">
              {user && "Hello " + user?.email}
            </h1>
            <h1 className="tracking-[0.1em] text-2xl text-white font-bold">
              Your Todo&apos;s
            </h1>
            {!user && (
              <h1 className="text-xs text-white">
                Are you family member?{" "}
                <span
                  className="font-bold cursor-pointer"
                  onClick={() => {
                    DialogBox?.showModal();
                  }}
                >
                  Click here
                </span>
              </h1>
            )}
          </div>
          {user && (
            <button
              className="btn btn-circle btn-outline"
              onClick={() => dispatch(removeSession())}
            >
              <svg
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
              >
                <path
                  d="M13.5 7.5l-3 3.25m3-3.25l-3-3m3 3H4m4 6H1.5v-12H8"
                  stroke="currentColor"
                ></path>
              </svg>
            </button>
          )}
        </div>
        <form onSubmit={(e) => handleForm(e)} className="w-full my-4">
          <label className="input input-bordered flex items-center gap-2">
            <input
              id="todoName"
              onChange={(e) => setValue(e.target.value)}
              value={value}
              type="text"
              className="grow"
              placeholder="Create new todo here"
            />
            <kbd className="kbd kbd-sm">Enter</kbd>
          </label>
        </form>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <div className="modal-header">
            <h3 className="font-bold text-lg">Your Email</h3>
            <h6 className="font-bold text-xs">
              Please provide your email address to proceed.
            </h6>
          </div>
          <form method="dialog" className="my-2" onSubmit={handleUser}>
            <input
              type="email"
              className="input input-primary w-full "
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              id="email"
            />
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <div className="flex items-end justify-center gap-2">
                <button
                  type="submit"
                  disabled={!isValidEmail}
                  className="btn btn-primary"
                >
                  Continue
                </button>
                <button
                  type="button"
                  onClick={() => {
                    DialogBox?.close();
                    setEmail("");
                  }}
                  className="btn btn-error"
                >
                  Close
                </button>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
