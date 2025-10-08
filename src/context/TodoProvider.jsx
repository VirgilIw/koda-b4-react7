import React from "react";
import { TodoContext } from "./TodoContext";

const TodoProvider = ({ children }) => {
  const [todos, setTodos] = React.useState(() => {
    const getTodos = window.localStorage.getItem("todos");
    return getTodos ? JSON.parse(getTodos) : [];
  });

  React.useEffect(() => {
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
