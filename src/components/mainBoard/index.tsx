import React from "react";
import Board from "./board/Board";
import BoardHeader from "./board/BoardHeader";

const Main: React.FunctionComponent = () => {
  return (
    <div className="h-full py-12 px-8 bg-beige-light">
      <BoardHeader />
      <Board />
    </div>
  );
};


export default Main;