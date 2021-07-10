import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchInsertList, ListDispatch, sortLists } from "../../../store/list/listAction";
import { getListsSelector, RootState } from "../../../store/rootReducer";
import Taskitem from "./Taskitem";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { List, Todo } from "../../../shared/model";
import { sortTodosInDiffList, sortTodosInSameList } from "../../../store/todo/todoAction";
import { updateList } from "../../../service/listService";
import { updateTodo } from "../../../service/todoService";
const ListList: React.FC = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [listName, setListName] = useState<string>("");
  const lists = useSelector(getListsSelector);
  const projectId = useSelector((state: RootState) => state.lists.curProject.projectId);
  const todos = useSelector((state: RootState) => state.todos);
  const ListDispatch = useDispatch<ListDispatch>();
  const dispatch = useDispatch();

  const insertList = () => {
    let pos = 65535;
    if (lists && lists.length > 0) {
      pos += lists[lists.length - 1].pos || 0;
    }
    const data = {
      projectId: projectId,
      title: listName,
      pos
    };
    ListDispatch(fetchInsertList(data)).then(() => setIsEdit(false));
  };
  const calcPos = (sIndex:number, dIndex: number, list: List[]|Todo[]): number => {
    const isDiff = sIndex===-1;
    if(!list || list.length===0){
      return 65535;
    }
    if (dIndex === 0) {
      return Math.round((list[0].pos || 0)/2);
    }
    if ((isDiff && dIndex === list.length) || (!isDiff && dIndex === (list.length - 1))) {
      return (list[dIndex-1].pos || 0) + 65535;
    }
    if(isDiff || (!isDiff && sIndex>dIndex)) {
      return Math.round((list[dIndex].pos + (list[dIndex - 1].pos || 0)) / 2);
    }
      return Math.round((list[dIndex].pos + (list[dIndex + 1].pos || 0)) / 2);
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
      const targetPos = calcPos(source.index, destination.index, lists);
      const data = { pos: targetPos, projectId: projectId };
      dispatch(sortLists({listId: draggableId, pos: targetPos} ));
      // TODO: if error, back to original state 
      updateList(draggableId, data);
      return;
    }
    // list source and destination
    const sInd = source.droppableId;
    const dInd = destination.droppableId;
    if (sInd === dInd) {
      // sort todos in same list
      const pos = calcPos(source.index, destination.index, todos[dInd]);
      dispatch(sortTodosInSameList({listId: dInd, todoId: draggableId, pos}));
      updateTodo(draggableId, {pos});
    } else {
      // sort todos in different list
      const pos = calcPos(-1, destination.index, todos[dInd]);
      dispatch(sortTodosInDiffList({sListId: sInd,dListId: dInd,todoId: draggableId, pos}));
      updateTodo(draggableId, {pos, listId: dInd});
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
              className="absolute top-0 bottom-0 left-0 right-0 overflow-x-scroll overflow-y-hidden whitespace-nowrap h-full"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {
                lists && lists.map((item, index) => (
                  <Taskitem list={item} key={item.id} index={index}/>
                ))
              }
              {provided.placeholder}
              <div className="m-2 w-80 inline-block align-top h-full">
                <div className="px-4 py-2 bg-purple-dark bg-opacity-10 rounded-md shadow">
                  {isEdit ? (
                    <>
                      <input type="text" placeholder="Enter list title" onChange={evt => setListName(evt.target.value)} />
                      <div className="flex mt-1 items-center">
                        <button className="btn btn-purple" onClick={insertList}>Add list</button>
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
