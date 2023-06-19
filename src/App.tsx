import React, { FormEvent, useState } from "react";

import "./App.css";
import InputField from "./Components/InputField";
import { ToDo } from "./modal";
import TodoList from "./Components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

function App() {
  const [todo, setTodo] = useState<string>("");
  const [toDos, setTodos] = useState<ToDo[]>([]);
  const [completedTodo, setCompletedTodo] = useState<ToDo[]>([]);

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...toDos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  const handleDrag = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add,
      active = toDos,
      complete = completedTodo;

    if (source.droppableId === "todosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "todosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodo(complete);
    setTodos(active);
  };
  return (
    <DragDropContext onDragEnd={handleDrag}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField toDo={todo} setToDo={setTodo} handleAdd={handleAdd} />
        <TodoList
          toDos={toDos}
          setTodos={setTodos}
          completedTodo={completedTodo}
          setCompletedTodo={setCompletedTodo}
        />
      </div>
    </DragDropContext>
  );
}

export default App;
