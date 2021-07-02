import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import Taskitem from "./Taskitem";

const TodoList: React.FC = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const lists = useSelector((state: RootState) => state.lists);

  const addList = () => {
    console.log();
  };
  return (
    <div className="flex flex-wrap">
      {
        lists && lists.items.map(list => {
          return <Taskitem key={list.id} list={list} />;
        })
      }
      <div className="p-2 w-full md:w-1/2 lg:w-1/4" onClick={addList}>
        <div className="px-4 py-2 bg-purple-dark bg-opacity-10 rounded-md shadow">
          <div className="flex items-center m-auto">
            {isEdit ? (
              <>
                <input type="text" placeholder="Enter list title"/>
                <button>Add list</button>
              </>
            ):( 
              <>
                <FiPlus />
                <span className="text-gray-dark text-center font-bold">Add a list</span>
              </>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};


export default TodoList;