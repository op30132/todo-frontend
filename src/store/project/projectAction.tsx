import { Dispatch } from "react";
import { getListByProjectId } from "../../service/listService";
import { List, Todo } from "../../shared/model";
import { ProjectAction } from "./projectReducer";

export const REQUEST_LISTS = "REQUEST_LISTS";
export const RECEIVE_LISTS = "RECEIVE_LISTS";
export const SELECT_PROJECT = "SELECT_PROJECT";
export const REQUEST_TASKS = "REQUEST_TASKS";
export const RECEIVE_TASKS = "RECEIVE_TASKS";
export const SORT_LISTS = "SORT_LISTS";

const requestLists = (projectId: string) => ({
  type: REQUEST_LISTS,
  projectId,
});

const receiveLists = (projectId: string, data: List[]) => ({
  type: RECEIVE_LISTS,
  projectId,
  lists: data,
});

export const sortLists = (listId: string, pos: number) => ({
  type: SORT_LISTS,
  listId,
  pos
});
const requestTasks = (ListId: string) => ({
  type: REQUEST_TASKS,
  ListId,
});
const receiveTasks = (ListId: string, data: Todo[]) => ({
  type: RECEIVE_TASKS,
  ListId,
  tasks: data
});

export const fetchLists = (projectId: string) => (dispatch: Dispatch<ProjectAction>): Promise<void> => {
  dispatch(requestLists(projectId));
  return getListByProjectId(projectId)
    .then(response => response.data)
    .then(res => dispatch(receiveLists(projectId, res)));
};