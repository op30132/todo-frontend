import React from "react";
import { Task } from "../../models/model";
import Taskitem from "./Taskitem";

const Board: React.FunctionComponent = () => {
  const taskList: Task[]=[{
    tid: 1,
    title: "Task",
    todos: [
      {did: 11, content: "Set up github repo", isComplete: true, creator: {
        id: 111,
        name: "winnie"
      }, dueDate: new Date()},
      {did: 22, content: "Write basic server that authenticate User", isComplete: false, creator: {
        id: 111,
        name: "winnie"
      }, dueDate: new Date()},
    ]
  },{
    tid: 2,
    title: "buy",
    todos: [
      {did: 33, content: "buy tissue", isComplete: true, creator: {
        id: 111,
        name: "winnie"
      }, dueDate: new Date()},
    ]
  }];
  return (
    <div className="flex flex-wrap">
      {
        taskList.map(task => {
          return <Taskitem key={task.tid} task={task} />;
        })
      }
      <div className="px-2 py-6 w-full md:w-1/2 lg:w-1/4">
        <div className="px-4 py-6 bg-purple-dark bg-opacity-10 rounded-md shadow">
          <div className="text-gray-dark text-center font-bold">Add a list</div>
        </div>
      </div>
    </div>
  );
};


export default Board;