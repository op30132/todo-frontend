import { Dispatch } from "react";
import { getListByProjectId } from "../../service/listService";
import { List } from "../../shared/model";

export enum ListActionTypes {
  SELECT_PROJECT = "SELECT_PROJECT",
  REQUEST_LISTS = "REQUEST_LISTS",
  RECEIVE_LISTS = "RECEIVE_LISTS",
  SORT_LISTS = "SORT_LISTS",
  ADD_LIST = "ADD_LIST",
  EDIT_LIST = "EDIT_LIST",
  DELETE_LIST = "DELETE_LIST",

}

interface IReduxBaseAction {
  type: ListActionTypes;
}
interface requestListtAction extends IReduxBaseAction {
  type: ListActionTypes.REQUEST_LISTS;
  projectId: string;
}
interface receiveListtAction extends IReduxBaseAction {
  type: ListActionTypes.RECEIVE_LISTS;
  projectId: string;
  data: List[]
}
interface sortListAction extends IReduxBaseAction {
  type: ListActionTypes.SORT_LISTS;
  data: pos
}
interface pos {
  listId: string;
  pos: number;
}
export type ProjectActions = requestListtAction |receiveListtAction| sortListAction;

const requestLists = (projectId: string): requestListtAction => ({
  type: ListActionTypes.REQUEST_LISTS,
  projectId,
});
const receiveLists = (projectId: string, data: List[]):receiveListtAction => ({
  type: ListActionTypes.RECEIVE_LISTS,
  projectId,
  data,
});
export const sortLists = (data: pos): sortListAction => ({
  type: ListActionTypes.SORT_LISTS,
  data,
});

export const fetchLists = (projectId: string) => (dispatch: Dispatch<ProjectActions>): Promise<void> => {
  dispatch(requestLists(projectId));
  return getListByProjectId(projectId)
    .then(response => response.data)
    .then(res => dispatch(receiveLists(projectId, res)));
};