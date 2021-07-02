import React from "react";
import TodoList from "./TodoList";
import ListHeader from "./ListHeader";

const Board: React.FC = () => {
  return (
    <div className="h-full py-12 px-8 bg-beige-light">
      <ListHeader />
      <TodoList />
    </div>
  );
};


export default Board;