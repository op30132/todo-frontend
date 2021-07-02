import { Dispatch } from "react";
import { getlistbyProjectId } from "../../service/listService";
import { List } from "../../shared/model";
import { ProjectAction } from "./projectReducer";

export const REQUEST_LISTS = "REQUEST_LISTS";
export const RECEIVE_LISTS = "RECEIVE_LISTS";
export const SELECT_PROJECT = "SELECT_PROJECT";

const requestLists = (projectId: string) => ({
  type: REQUEST_LISTS,
  projectId,
});

const receiveLists = (projectId: string, data: List[]) => ({
  type: RECEIVE_LISTS,
  projectId,
  lists: data,
});

export const fetchLists = (projectId: string) => (dispatch: Dispatch<ProjectAction>): Promise<void> => {
  dispatch(requestLists(projectId));
  return getlistbyProjectId(projectId)
    .then(response => response.data)
    .then(res => dispatch(receiveLists(projectId, res)));
};

