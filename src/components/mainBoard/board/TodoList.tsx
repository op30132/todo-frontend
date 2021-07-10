import React, { useCallback, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { FiPlusSquare } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { List, Todo, TodoDTO } from "../../../shared/model";
import { getTodosByListId, RootState } from "../../../store/rootReducer";
import { fetchInsertTodo, fetchUpdateTodo, TodoDispatch } from "../../../store/todo/todoAction";
import InsertTaskModal from "../../modal/InsertTaskModal";
import TodoItem from "./TodoItem";
interface IProps {
  list: List;
}
const TodoList: React.FC<IProps> = ({ list }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<TodoDTO>({});
  const todos = useSelector((state: RootState) => getTodosByListId(state, list.id));
  const dispatch = useDispatch<TodoDispatch>();
  const onHide = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const openModalWithItem = useCallback((todo?: TodoDTO) => {
    openModal();
    setCurrentItem(todo || {});
  }, []);
  const onCompleted = useCallback((todo: Todo) => {
    todo.isComplete = !todo.isComplete;
    updateTask(todo);
  }, []);
  const insertTask = (todo: TodoDTO) => {
    let pos = 65535;
    if (todos && todos.length > 0) {
      pos += todos[todos.length - 1].pos || 0;
    }
    const data = {
      ...todo,
      listId: list.id,
      pos
    };

    dispatch(fetchInsertTodo(data)).then(() => onHide());
  };
  const updateTask = (todo: TodoDTO) => {
    const data = { ...currentItem, ...todo };
    dispatch(fetchUpdateTodo(data.id||"", data)).then(() => onHide());
  };

  return (
    <>
      <div className="flex-grow overflow-y-auto min-h-0 px-3">
      <Droppable droppableId={list.id}
      >
        {(provided) => {
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
             </div>
          );
        }}
      </Droppable>
    </div>
    <div onClick={() => openModalWithItem()} className="flex items-center border-beige-dark pb-2 px-3">
     <div className="flex items-center cursor-pointer hover:bg-beige-darker w-full p-2 rounded-md">  
       <FiPlusSquare />
       <span className="ml-2">Add a task</span>
     </div>
   </div>
   <InsertTaskModal isOpen={isOpen} onHide={onHide} onSubmit={"id" in currentItem ? updateTask : insertTask} todoItem={currentItem}></InsertTaskModal>
  </>
  );
};

export default React.memo(TodoList);