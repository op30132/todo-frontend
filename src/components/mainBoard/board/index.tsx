import React from "react";
import ListList from "./ListList";
import ListHeader from "./ListHeader";

const Board: React.FC = () => {
  return (
    <div className="h-full flex flex-col pt-10 px-5 bg-beige-light">
      <ListHeader />
      <ListList />
    </div>
  );
};


export default Board;