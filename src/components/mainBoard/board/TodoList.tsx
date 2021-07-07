import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { FiPlusSquare } from "react-icons/fi";
import useApi from "../../../hook/UseAxios";
import { getTodosByListId, insertTodo, updateTodo } from "../../../service/todoService";
import { List, Todo } from "../../../shared/model";
import InsertTaskModal from "../../modal/InsertTaskModal";
import TodoItem from "./TodoItem";
interface IProps {
  list: List;
}
const TodoList: React.FC<IProps> = ({ list }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [todos, error, isLoading, refetch] = useApi<Todo[]>(getTodosByListId(list.id));
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
    todo.isComplete = !todo.isComplete;
    updateTask(todo);
  };
  const insertTask = (todo: Todo) => {
    let pos = 65535;
    if (todos && todos.length > 0) {
      pos += todos[todos.length - 1].pos || 0;
    }
    const data = {
      ...todo,
      listId: list.id,
      pos
    };
    insertTodo(data).then(handleSuccess);
  };
  const handleSuccess = () => {
    onHide();
    refetch({});
  };
  const updateTask = (todo: Todo) => {
    const data = { ...currentItem, ...todo };
    updateTodo(data).then(handleSuccess);
  };
  if (isLoading) return <div>loading</div>;
  if (error) return <div>Something wrong</div>;
  return (
    <Droppable droppableId={list.id}
    >
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {
              todos && todos.map((item: Todo, index: number) => {
                return (
                  <TodoItem key={item.id} todo={item} index={index} clickEvent={openModalWithItem} onCompleted={onCompleted} />
                );
              })
            }
            {provided.placeholder}
            <div onClick={() => openModalWithItem()} className="taskitem flex items-center border border-beige-dark border-opacity-80 p-1 cursor-pointer">
              <div className="flex items-center m-auto">
                <FiPlusSquare />
                <span className="ml-2">Add a task</span>
              </div>
            </div>
            <InsertTaskModal isOpen={isOpen} onHide={onHide} onSubmit={"id" in currentItem ? updateTask : insertTask} todoItem={currentItem}></InsertTaskModal>
          </div>
        );
      }}
    </Droppable>
  );
};

export default TodoList;