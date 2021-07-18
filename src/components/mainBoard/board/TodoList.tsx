import React, { useCallback, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { FiPlusSquare } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { List, Todo, TodoDTO } from "../../../shared/model";
import { getTodosByListId, RootState } from "../../../store/rootReducer";
import { fetchdeleteTodo, fetchInsertTodo, fetchUpdateTodo, TodoDispatch } from "../../../store/todo/todoAction";
import InsertTaskModal from "../../modal/InsertTaskModal";
import TodoItem from "./TodoItem";
interface IProps {
  list: List;
}
const TodoList: React.FC<IProps> = ({ list }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Todo|null>(null);
  const todos = useSelector((state: RootState) => getTodosByListId(state, list.id));
  const dispatch = useDispatch<TodoDispatch>();
  const onHide = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const openModalWithItem = useCallback((todo?: Todo) => {
    openModal();
    setCurrentItem(todo || null);
  }, []);
  const onCompleted = useCallback((todo: Todo) => {
    updateTodo({...todo, isComplete: !todo.isComplete});
  } , []);
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
  const deleteItem = () => {
    if(currentItem && currentItem.id) {
      dispatch(fetchdeleteTodo(list.id, currentItem.id)).then(() => onHide());
    }
  };
  const updateTodo = (todo: Todo) => {
    dispatch(fetchUpdateTodo(todo.id, todo)).then(() => onHide());
  };
  const handleSubmit = (todo: TodoDTO) => {
    if(currentItem) {
      const data: Todo = { ...currentItem, ...todo };
      updateTodo(data);
      return;
    }
    insertTask(todo);
  };
  return (
    <>
      <div className="flex-grow overflow-y-auto min-h-0 px-3">
        <Droppable droppableId={list.id}>
          {(provided) => {
            return (
              <div
                className="mb-2"
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
      <InsertTaskModal isOpen={isOpen} onHide={onHide} deleteItem={deleteItem} onSubmit={handleSubmit} todoItem={currentItem}></InsertTaskModal>
    </>
  );
};

export default React.memo(TodoList);