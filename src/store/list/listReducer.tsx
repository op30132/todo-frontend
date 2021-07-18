import { List } from "../../shared/model";
import { ListActionTypes, ListActions} from "./listAction";

export interface ListbyProjectIdState {
  [projectId: string]: List[]
}
export interface curProjectState {
  isFetching: boolean;
  projectId: string;
}
const initialCurProjectState= {
  isFetching: false,
  projectId: "",
};
const sortlist = (state: List[], action: ListActions): List[] => {
  switch (action.type) {
  case ListActionTypes.SORT_LISTS: {
    const list = Array.from(state);
    const target = list.find(el => el.id===action.data.listId);
    if(target) {
      target.pos = action.data.pos;
    }
    return list.sort((a, b) => a.pos - b.pos);
  }
  default:
    return state;
  }
}; 
const curProjectReducer = (state: curProjectState = initialCurProjectState, action: ListActions) => {
  switch (action.type) {  
  case ListActionTypes.REQUEST_LISTS:
    return {
      isFetching: true,
      projectId: action.projectId
    };
  case ListActionTypes.RECEIVE_LISTS:
    return {
      isFetching: false,
      projectId: action.projectId
    };
  default:
    return state;
  }
};
const list = (state: List[]=[], action: ListActions): List[] => {
  switch (action.type) {
  case ListActionTypes.ADD_LIST:
    return [...state, action.data];
  case ListActionTypes.EDIT_LIST: 
    return state.map(el => {
      if(el.id!==action.listId) return el;
      console.log(action.data);
      return action.data;
    });
  case ListActionTypes.DELETE_LIST:
    return state.filter(el => el.id !== action.listId);
  default:
    return state;
  }
};
const listByProjectIdReducer = (state: ListbyProjectIdState={}, action: ListActions, {curProject}: listsState): ListbyProjectIdState => {
  switch (action.type) {
  case ListActionTypes.ADD_LIST:
  case ListActionTypes.EDIT_LIST:
  case ListActionTypes.DELETE_LIST:
    return {
      ...state, 
      [curProject.projectId]: list(state[curProject.projectId], action)
    };
  case ListActionTypes.SORT_LISTS:
    return {
      ...state, 
      [curProject.projectId]: sortlist(state[curProject.projectId], action)
    };
  case ListActionTypes.RECEIVE_LISTS:
    return {
      ...state, 
      [curProject.projectId]: action.data
    };
  default:
    return state;
  }
};
export interface listsState {
  curProject: curProjectState,
  listsbyProjectId: ListbyProjectIdState;
}
const initialListsState= {
  curProject: initialCurProjectState,
  listsbyProjectId: {}
};
export const listsReducer = (state: listsState = initialListsState, action: ListActions): listsState => {
  return {
    curProject: curProjectReducer(state.curProject, action),
    listsbyProjectId: listByProjectIdReducer(state.listsbyProjectId, action, state)
  };
};
