import React from "react";
import Board from "./board";
import Sidebar from "./sidebar/Sidebar";

const MainBoard: React.FC = () => {
  return (
    <div className="flex h-screen antialiased text-gray-dark">
      <Sidebar/>
      <div className="flex flex-col flex-1 min-h-screen overflow-x-hidden overflow-y-auto">
        <Board/>
      </div>
    </div>
  );
};


export default MainBoard;