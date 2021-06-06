import React, { useState } from "react";
import { Task, Todo } from "../../models/model";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { FiCheckCircle, FiPlusSquare } from "react-icons/fi";
import dayjs from "dayjs";
import InsertTaskModal from "../modal/InsertTaskModal";

const Taskitem = (props: { task: Task }): JSX.Element => {
  const { task } = props;
  const [isOpen, setIsOpen] = useState(false);

  const onHide = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };
  return (
    <>
      <div className="px-2 py-6 w-full md:w-1/2 lg:w-1/4">
        <div className="px-4 py-6 bg-beige rounded-lg shadow">
          <div className="text-purple font-bold">{task.title}</div>
          <ul>
            {
              task.todos.map((todo: Todo) => {
                return (
                  <div key={todo.did} className="taskitem bg-white shadow ">
                    <div className="flex items-center ">
                      <div className="mr-4">
                        {todo.isComplete ?
                          <FiCheckCircle className="text-purple" /> :
                          <RiCheckboxBlankCircleLine className="text-gray" />}
                      </div>
                      <span className="text-gray-dark font-semibold">{todo.content}</span>
                    </div>
                    <span className="ml-8 text-beige-dark text-base">{dayjs(todo.dueDate).format("h:mm a")}</span>
                  </div>
                );
              })
            }
            <div onClick={openModal} className="taskitem flex items-center border border-beige-dark border-opacity-80 p-2 cursor-pointer">
              <div className="flex items-center m-auto">
                <FiPlusSquare />
                <span className="ml-2">Add a task</span>
              </div>
            </div>
          </ul>
        </div>
      </div>
      <InsertTaskModal isOpen={isOpen} onHide={onHide}></InsertTaskModal>
    </>
  );
};

export default Taskitem;