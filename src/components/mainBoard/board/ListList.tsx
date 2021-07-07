import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { insertList, updateList } from "../../../service/listService";
import { fetchLists, sortLists } from "../../../store/list/listAction";
import { RootState } from "../../../store/rootReducer";
import Taskitem from "./Taskitem";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { List } from "../../../shared/model";
const ListList: React.FC = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [listName, setListName] = useState<string>("");
  const lists = useSelector((state: RootState) => state.lists);
  const dispatch = useDispatch();
  const insertLIst = () => {
    let pos = 65535;
    if (lists && lists.items && lists.items.length > 0) {
      pos += lists.items[lists.items.length - 1].pos || 0;
    }
    const data = {
      projectId: lists.projectId,
      title: listName,
      pos
    };
    insertList(data).then(() => {
      setIsEdit(false);
      dispatch(fetchLists(lists.projectId));
    });
  };
  const calcPos = (sIndex:number, dIndex: number, list: List[]): number => {
    if (dIndex === (list.length - 1)) {
      return (list[dIndex].pos || 0) + 65535;
    }
    if (dIndex === 0) {
      return Math.round((list[0].pos || 0)/2);
    }
    if(sIndex<dIndex) {
      return Math.round((list[dIndex].pos + (list[dIndex + 1].pos || 0)) / 2);
    }
    return Math.round((list[dIndex].pos + (list[dIndex - 1].pos || 0)) / 2);
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) {
      return;
    }
    if (result.type === "column") {
      // sort list
      if(source.index===destination.index){
        return;
      }
      const targetPos = calcPos(source.index, destination.index, lists.items);
      const data = { pos: targetPos, projectId: lists.projectId };
      dispatch(sortLists({listId: draggableId, pos: targetPos} ));
      // TODO: if error, back to original state 
      updateList(draggableId, data);
      return;
    }
    // list source and destination
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;
    if (sInd === dInd) {
      // sort todos in same list

      console.log(source.index);
      console.log(destination.index);
      // target item id
      console.log(draggableId);
    } else {
      // sort todos in different list
      console.log(source.index);
      console.log(destination.index);
      // target item id
      console.log(draggableId);
    }
  };
  return (
    <div className="relative flex-grow">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-droppables"
          direction="horizontal"
          type="column"
        >
          {provided => (
            <div
              className="absolute top-0 bottom-0 left-0 right-0 select-none overflow-x-scroll overflow-y-hidden whitespace-nowrapflex h-full"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {
                lists && lists.items.map((item, index) => (
                  <Taskitem list={item} key={item.id} index={index}/>
                ))
              }
              {provided.placeholder}
              <div className="p-2 w-80 inline-block align-top h-full">
                <div className="px-4 py-2 bg-purple-dark bg-opacity-10 rounded-md shadow">
                  {isEdit ? (
                    <>
                      <input type="text" placeholder="Enter list title" onChange={evt => setListName(evt.target.value)} />
                      <div className="flex mt-1 items-center">
                        <button className="btn btn-purple" onClick={insertLIst}>Add list</button>
                        <MdClose size={26} onClick={() => setIsEdit(false)} />
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center" onClick={() => setIsEdit(true)}>
                      <MdAdd />
                      <span className="text-gray-dark text-center font-bold">Add a list</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ListList;
