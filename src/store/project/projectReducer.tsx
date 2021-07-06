import { List } from "../../shared/model";
import { RECEIVE_LISTS, REQUEST_LISTS, SORT_LISTS } from "./projectAction";

export interface ProjectAction {
  type: string;
  projectId?: string;
  lists?: List[]
}

export interface ProjectState {
  isFetching: boolean;
  projectId: string;
  items: List[];
}

const initialState = {
  isFetching: false,
  projectId: "",
  items: []
};

export const lists = (state: ProjectState = initialState, action: ProjectAction): ProjectState => {
  switch (action.type) {
    case SORT_LISTS:
      return Object.assign({}, state, {
        items: action.lists
      });
    case REQUEST_LISTS:
      return Object.assign({}, state, {
        isFetching: true,
        projectId: action.projectId,
      });
    case RECEIVE_LISTS:
      return Object.assign({}, state, {
        isFetching: false,
        projectId: action.projectId,
        items: action.lists
      });
    default:
      return state;
  }
};

