import React, { useState } from "react";
import { List } from "../../../shared/model";
import { MdMoreHoriz } from "react-icons/md";
import { useDispatch } from "react-redux";
import { fetchdeleteList, fetchUpdateList, ListDispatch } from "../../../store/list/listAction";
import { Draggable } from "react-beautiful-dnd";
import TodoList from "./TodoList";
import DropDownMenu from "../../modal/DropDownMenu";
import EditInput from "../../modal/EditInput";

interface IProps {
  list: List;
  index: number
}

const Taskitem: React.FC<IProps> = ({ list, index }) => {
  const dispatch = useDispatch<ListDispatch>();

  const updateListName = (title: string) => {
    dispatch(fetchUpdateList(list.id , { ...list, title }));
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
            <div className="flex justify-between items-center px-4 py-2" {...provided.dragHandleProps}>
              <div className="w-full text-purple font-bold">
                <EditInput defaultValue={list.title} onSubmit={updateListName}/>
              </div>
              <DropDownMenu 
                trigger={<MdMoreHoriz size={24}/>}
                menu={<span className="text-purple font-bold" onClick={() => dispatch(fetchdeleteList(list.id))}>delete</span>}  
              />
            </div>
            <TodoList list={list} />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Taskitem;