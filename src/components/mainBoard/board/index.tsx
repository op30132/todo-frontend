import React from "react";
import List from "./List";
import ListHeader from "./ListHeader";

const Board: React.FC = () => {
  return (
    <div className="h-full py-12 px-8 bg-beige-light">
      <ListHeader />
      <List />
    </div>
  );
};


export default Board;