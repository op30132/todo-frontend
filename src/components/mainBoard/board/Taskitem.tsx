import React, { useState } from "react";
import { List } from "../../../shared/model";
import { MdMoreHoriz } from "react-icons/md";
import { useDispatch } from "react-redux";
import { fetchUpdateList, ListDispatch } from "../../../store/list/listAction";
import { Draggable } from "react-beautiful-dnd";
import TodoList from "./TodoList";

interface IProps {
  list: List;
  index: number
}

const Taskitem: React.FC<IProps> = ({ list, index }) => {
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch<ListDispatch>();

  const editListTitle = () => {
    setIsEdit(true);
  };
  const updateListName = (title: string) => {
    if (title === list.title) {
      setIsEdit(false);
      return;
    }
    dispatch(fetchUpdateList(list.id , { ...list, title }))
    .then(() => setIsEdit(false));
  };
  return (
    <Draggable draggableId={list.id} index={index}>
      {provided => (
        <div
          className={"m-2 w-80 inline-block align-top h-full "+ (index===0 ? " ml-4" : "")}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className="flex flex-col max-h-full bg-beige rounded-lg shadow">
            <div className="flex justify-between items-center px-4 py-2" onClick={editListTitle} {...provided.dragHandleProps}>
              {isEdit ? (
                <input type="text" autoFocus defaultValue={list.title} onBlur={e => updateListName(e.target.value)} onKeyPress={e => (e.key === "Enter" ? updateListName((e.target as HTMLInputElement).value) : "")} />
              ) : (
                <span className="p-2 text-purple font-bold">{list.title}</span>
              )}
              <MdMoreHoriz size={24}/>
            </div>
            <TodoList list={list} />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Taskitem;