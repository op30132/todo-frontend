import React, { useState } from "react";
import { List, Todo } from "../../../shared/model";
import { FiPlusSquare } from "react-icons/fi";
import InsertTaskModal from "../../modal/InsertTaskModal";
import useApi from "../../../hook/UseAxios";
import { insertTodo, getTodosbyListId } from "../../../service/todoService";
import TodoItem from "./TodoItem";

interface IProps {
  list: List;
}

const Taskitem: React.FC<IProps> = ({ list }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [todos, error, isLoading, refetch] = useApi<Todo[]>(getTodosbyListId(list.id));

  const onHide = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const openModalWithItem = (todo?: Todo) => {
    openModal();
    setCurrentItem(todo || {});
  };
  const onCompleted = (todo: Todo) => {
    console.log(todo.isComplete);
  };
  const insertTask = (todo: Todo) => {
    const data = {...todo, listId: list.id};
    insertTodo(data).then(() => {
      onHide();
      refetch(true);
    }).catch(console.log);
  };
  if(isLoading) return <div>loading</div>;
  if(error) return <div>Something wrong</div>;
  return (
    <>
      <div className="p-2 w-full md:w-1/2 lg:w-1/4">
        <div className="px-4 py-2 bg-beige rounded-lg shadow">
          <div className="text-purple font-bold mb-1">{list.title}</div>
          <ul>
            {
              todos && todos.map((todo: Todo) => {
                return (
                  <TodoItem key={todo.id} todo={todo} clickEvent={openModalWithItem} onCompleted={onCompleted} />
                );
              })
            }
            <div onClick={() => openModalWithItem()} className="taskitem flex items-center border border-beige-dark border-opacity-80 p-1 cursor-pointer">
              <div className="flex items-center m-auto">
                <FiPlusSquare />
                <span className="ml-2">Add a task</span>
              </div>
            </div>
          </ul>
        </div>
      </div>
      <InsertTaskModal isOpen={isOpen} onHide={onHide} onSubmit={insertTask} todoItem={currentItem}></InsertTaskModal>
    </>
  );
};

export default Taskitem;