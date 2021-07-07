import React, { useState } from "react";
import { List } from "../../../shared/model";
import { MdMoreHoriz } from "react-icons/md";
import { updateList } from "../../../service/listService";
import { useDispatch } from "react-redux";
import { fetchLists } from "../../../store/list/listAction";
import { Draggable } from "react-beautiful-dnd";
import TodoList from "./TodoList";

interface IProps {
  list: List;
  index: number
}

const Taskitem: React.FC<IProps> = ({ list, index }) => {
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  const editListTitle = () => {
    setIsEdit(true);
  };
  const updateListName = (title: string) => {
    if (title === list.title) {
      setIsEdit(false);
      return;
    }
    updateList(list.id || "", { ...list, title }).then(() => {
      setIsEdit(false);
      dispatch(fetchLists(list.projectId || ""));
    });
  };
  return (
    <Draggable draggableId={list.id} index={index}>
      {provided => (
        <div
          className="p-2 w-80 inline-block align-top h-full"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className="">
            <div className="px-4 py-2 bg-beige rounded-lg shadow">
              <div className="flex justify-between items-center" onClick={editListTitle} {...provided.dragHandleProps}>
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
        </div>
      )}
    </Draggable>
  );
};

export default Taskitem;