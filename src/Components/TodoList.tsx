import React, { FC } from "react";
import { Droppable } from "react-beautiful-dnd";
import { ToDo } from "../modal";
import SingleList from "./SingleList";
import "./style.css";

interface props {
  toDos: ToDo[];
  setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>;
  completedTodo: ToDo[];
  setCompletedTodo: React.Dispatch<React.SetStateAction<ToDo[]>>;
}

const TodoList: FC<props> = ({
  toDos,
  setTodos,
  completedTodo,
  setCompletedTodo,
}) => {
  return (
    <>
      <div className="conatiner">
        <Droppable droppableId="todosList">
          {(provided) => (
            <div
              className="todos"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="todos__heading">Active tasks</span>
              {toDos.map((todo, index) => (
                <SingleList
                  index={index}
                  todo={todo}
                  key={todo.id}
                  todos={toDos}
                  setTodos={setTodos}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="todoremove">
          {(provided) => (
            <div
              className="todos remove"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="todos__heading">Completed tasks</span>
              {completedTodo.map((todo, index) => (
                <SingleList
                  index={index}
                  todo={todo}
                  key={todo.id}
                  todos={completedTodo}
                  setTodos={setCompletedTodo}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </>
  );
};

export default TodoList;
