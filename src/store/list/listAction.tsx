import { Dispatch } from "react";
import { ThunkDispatch } from "redux-thunk";
import { deleteList, getListByProjectId, insertList, updateList } from "../../service/listService";
import { List, ListDTO, Todo } from "../../shared/model";
import { emitAddList, emitDeleteList, emitJoinProject, emitUpdateList } from "../../socket/socket";
import { receiveTodoAction, receiveTodos } from "../todo/todoAction";
import { listsState } from "./listReducer";

export enum ListActionTypes {
  REQUEST_LISTS = "REQUEST_LISTS",
  RECEIVE_LISTS = "RECEIVE_LISTS",
  SORT_LISTS = "SORT_LISTS",
  ADD_LIST = "ADD_LIST",
  EDIT_LIST = "EDIT_LIST",
  DELETE_LIST = "DELETE_LIST",
}
const requestLists = (projectId: string): requestListAction => ({
  type: ListActionTypes.REQUEST_LISTS,
  projectId,
});
const receiveLists = (projectId: string, data: List[]):receiveListAction => ({
  type: ListActionTypes.RECEIVE_LISTS,
  projectId,
  data,
});
export const sortLists = (data: pos): sortListAction => ({
  type: ListActionTypes.SORT_LISTS,
  data,
});
export const addList = (data: List): addListAction => ({
  type: ListActionTypes.ADD_LIST,
  data
});
export const editList = (listId: string, data: List): editListAction => ({
  type: ListActionTypes.EDIT_LIST,
  listId,
  data
});
export const delList = (listId: string): deleteListAction => ({
  type: ListActionTypes.DELETE_LIST,
  listId
});
export const fetchInsertList = (data: ListDTO) => (dispatch: Dispatch<addListAction>): Promise<void> => {
  return insertList(data).then(res => {
    dispatch(addList(res));
    emitAddList(res);
  });
};
export const fetchUpdateList = (listId: string, data: ListDTO) => (dispatch: Dispatch<editListAction>): Promise<void> => {
  return updateList(listId, data).then(res => {
    dispatch(editList(listId, res));
    emitUpdateList(res);
  });
};
export const fetchdeleteList = (listId: string) => (dispatch: Dispatch<deleteListAction>): Promise<void> => {
  return deleteList(listId).then(() => {
    dispatch(delList(listId));
    emitDeleteList(listId);
  });
};
export const fetchLists = (projectId: string) => (dispatch: Dispatch<ListActions>): Promise<void> => {
  dispatch(requestLists(projectId));
  return getListByProjectId(projectId)
    .then(res => {
      const todos: {
        [key: string]: Todo[]
      } ={};
      const arr = res.map(el => {
        todos[el.id] = el.todos;
        return el;
      });
      dispatch(receiveTodos(todos));
      dispatch(receiveLists(projectId, arr));
      emitJoinProject(projectId);
    });
};
export type ListDispatch = ThunkDispatch<listsState, void, ListActions>;
interface IReduxBaseAction {
  type: ListActionTypes;
}
interface requestListAction extends IReduxBaseAction {
  type: ListActionTypes.REQUEST_LISTS;
  projectId: string;
}
interface receiveListAction extends IReduxBaseAction {
  type: ListActionTypes.RECEIVE_LISTS;
  projectId: string;
  data: List[]
}
interface sortListAction extends IReduxBaseAction {
  type: ListActionTypes.SORT_LISTS;
  data: pos
}
interface addListAction extends IReduxBaseAction {
  type: ListActionTypes.ADD_LIST;
  data: List
}
interface editListAction extends IReduxBaseAction {
  type: ListActionTypes.EDIT_LIST;
  listId: string;
  data: List
}
interface deleteListAction extends IReduxBaseAction {
  type: ListActionTypes.DELETE_LIST;
  listId: string; 
}
interface pos {
  listId: string;
  pos: number;
}
export type ListActions = requestListAction|receiveListAction|sortListAction|addListAction|editListAction|deleteListAction|receiveTodoAction;
