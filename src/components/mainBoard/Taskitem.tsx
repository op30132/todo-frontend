import React, { useState } from "react";
import { Task, Todo } from "../../models/model";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { FiCheckCircle, FiPlusSquare } from "react-icons/fi";
import dayjs from "dayjs";
import InsertTaskModal from "../modal/InsertTaskModal";

const Taskitem = (props: { task: Task }): JSX.Element => {
  const { task } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const onHide = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const openModalWithItem = (todo: Todo) => {
    openModal();
    setCurrentItem(todo);
  };
  const onCompleted = (todo: Todo) => {
    console.log(todo.isComplete);
  };
  return (
    <>
      <div className="p-2 w-full md:w-1/2 lg:w-1/4">
        <div className="px-4 py-2 bg-beige rounded-lg shadow">
          <div className="text-purple font-bold mb-1">{task.title}</div>
          <ul>
            {
              task.todos.map((todo: Todo) => {
                return (
                  <div key={todo.did} className="taskitem bg-white shadow cursor-pointer" onClick={() => openModalWithItem(todo)}>
                    <div className="flex items-start ">
                      <div className="mr-4 mt-1" onClick={(e)=> {e.stopPropagation(); onCompleted(todo);}}>
                        {todo.isComplete ?
                          <FiCheckCircle className="text-purple text-lg" /> :
                          <RiCheckboxBlankCircleLine className="text-gray text-xl" />}
                      </div>
                      <span className="text-gray-dark font-semibold">{todo.title}</span>
                    </div>
                    <span className="ml-8 text-beige-dark text-base">{dayjs(todo.dueDate).format("h:mm a")}</span>
                  </div>
                );
              })
            }
            <div onClick={openModal} className="taskitem flex items-center border border-beige-dark border-opacity-80 p-1 cursor-pointer">
              <div className="flex items-center m-auto">
                <FiPlusSquare />
                <span className="ml-2">Add a task</span>
              </div>
            </div>
          </ul>
        </div>
      </div>
      <InsertTaskModal isOpen={isOpen} onHide={onHide} todoItem={currentItem}></InsertTaskModal>
    </>
  );
};

export default Taskitem;