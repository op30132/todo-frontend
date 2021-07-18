import React from "react";
import { clientInit } from "../../socket/socket";
import Board from "./board";
import Sidebar from "./sidebar/Sidebar";

clientInit();
const MainBoard: React.FC = () => {

  return (
    <div className="flex h-screen antialiased text-gray-dark">
      <Sidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <Board />
      </div>
    </div>
  );
};


export default MainBoard;