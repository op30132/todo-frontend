import React from "react";
import { FiPlus } from "react-icons/fi";
import { Task } from "../../models/model";
import Taskitem from "./Taskitem";

const Board: React.FunctionComponent = () => {
  const taskList: Task[]=[{
    tid: 1,
    title: "Task",
    todos: [
      {did: 11, title: "Set up github repo", isComplete: true, creator: {
        id: 111,
        name: "winnie"
      }, dueDate: new Date()},
      {did: 22, title: "Write basic server that authenticate User", isComplete: false, creator: {
        id: 111,
        name: "winnie"
      }, dueDate: new Date()},
    ]
  },{
    tid: 2,
    title: "buy",
    todos: [
      {did: 33, title: "buy tissue", isComplete: true, creator: {
        id: 111,
        name: "winnie"
      }, dueDate: new Date()},
    ]
  }];
  const addList = () => {
    console.log();
  };
  return (
    <div className="flex flex-wrap">
      {
        taskList.map(task => {
          return <Taskitem key={task.tid} task={task} />;
        })
      }
      <div className="p-2 w-full md:w-1/2 lg:w-1/4" onClick={addList}>
        <div className="px-4 py-2 bg-purple-dark bg-opacity-10 rounded-md shadow">
          <div className="flex items-center m-auto">
            <FiPlus />
            <span className="text-gray-dark text-center font-bold">Add a list</span>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Board;