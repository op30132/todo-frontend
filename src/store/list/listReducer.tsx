import { List } from "../../shared/model";
import { ListActionTypes, ProjectActions} from "./listAction";
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
const sortlist = (state: List[], action: ProjectActions): List[] => {
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
export const listReducer = (state: ProjectState = initialState, action: ProjectActions): ProjectState => {
  switch (action.type) {
    case ListActionTypes.SORT_LISTS:
      return {
        ...state,
        items: sortlist(state.items, action)
      };
    case ListActionTypes.REQUEST_LISTS:
      return Object.assign({}, state, {
        isFetching: true,
        projectId: action.projectId,
      });
    case ListActionTypes.RECEIVE_LISTS:
      return Object.assign({}, state, {
        isFetching: false,
        projectId: action.projectId,
        items: action.data
      });
    default:
      return state;
  }
};

