import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { insertList, updateList } from "../../../service/listService";
import { fetchLists, sortLists } from "../../../store/project/projectAction";
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
  const calcPos = (dIndex: number, list: List[]): number => {
    const dItemIndex = list.findIndex(el => el.pos === dIndex);
    const dItem = list.find(el => el.pos === dIndex);

    if (dItemIndex === (list.length - 1)) {
      return (dItem?.pos || 0) + 65535;
    }
    return (dIndex + (list[dItemIndex + 1].pos || 0)) / 2;
  };
  const reorder = (startIndex: number, endIndex: number, list: List[]) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) {
      return;
    }
    if (result.type === "column") {
      // sort list
      const pos = calcPos(destination.index, lists.items);
      updateList(draggableId, { pos, projectId: lists.projectId }).then(() => {
        dispatch(sortLists(draggableId, pos));
      });

      return;
    }
    // list source and destination
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;
    if (sInd === dInd) {
      // sort todos in same list
      console.log(source.index);
      console.log(destination.index);
      // target list id
      console.log(draggableId);
    } else {
      // sort todos in different list
      console.log(source.index);
      console.log(destination.index);
      // target list id
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
                lists && lists.items.map((item) => (
                  <Taskitem list={item} key={item.id} />
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
