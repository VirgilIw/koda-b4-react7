import React from "react";
import { TodoContext } from "./context/TodoContext";

const App = () => {
  const [newTodo, setNewTodo] = React.useState("");
  const inputRef = React.useRef(null);

  return (
    <TodoContext.Consumer>
      {({ todos, setTodos }) => {
        const handleSubmit = (e) => {
          e.preventDefault();
          if (newTodo.trim() === "") {
            alert("Task jangan kosong bang ganteng 😎!");
            return;
          }

          const nextId =
            todos.length === 0
              ? 1
              : Math.max(...todos.map((todo) => todo.id)) + 1;

          const newTask = { id: nextId, text: newTodo, completed: false };
          setTodos((prev) => [...prev, newTask]);
          setNewTodo("");
          inputRef.current?.focus();
        };

        const deleteTask = (id) => {
          setTodos((prev) => prev.filter((todo) => todo.id !== id));
        };

        const handleToggleCompleted = (id) => {
          setTodos((prev) =>
            prev.map((todo) =>
              todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
          );
        };

        return (
          <div className="bg-[#1a171f] w-full text-white pb-10 h-full">
            <div className="container mx-auto px-5 pt-10 shadow-2xl drop-shadow-amber-500 w-1/2 h-[100%]">
              <h1 className="text-4xl font-[500] pb-5">ToDoList</h1>
              <form
                onSubmit={handleSubmit}
                className="flex justify-between gap-4"
              >
                <input
                  type="text"
                  placeholder="Please Enter your New task"
                  className="w-[50%] md:w-[80%] py-2 border border-slate-500 px-4 rounded text-white"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  name="todos"
                  ref={inputRef}
                />
                <button
                  type="submit"
                  className="w-[50%] md:w-[20%] bg-amber-400 rounded text-black"
                >
                  Add
                </button>
              </form>
              <div className="mt-8">
                {todos.length === 0 ? (
                  <p className="text-center text-gray-400">
                    No tasks yet. Add a new one!
                  </p>
                ) : (
                  <ul>
                    {todos.map((todo) => (
                      <li
                        key={todo.id}
                        className="flex flex-col md:flex-row md:justify-between mt-5 p-4 bg-white text-black rounded shadow"
                      >
                        <div className="flex items-center">
                          <p className="mr-2">{todo.id}.</p>
                          <p
                            onClick={() => handleToggleCompleted(todo.id)}
                            className={`py-2 px-2 m-0 rounded cursor-pointer ${
                              todo.completed ? "line-through text-gray-500" : ""
                            }`}
                          >
                            {todo.text}
                          </p>
                        </div>
                        <button
                          onClick={() => deleteTask(todo.id)}
                          className="text-white bg-red-500 hover:text-red-700 cursor-pointer p-2 rounded"
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        );
      }}
    </TodoContext.Consumer>
  );
};

export default App;
