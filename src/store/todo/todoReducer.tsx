import { Todo } from "../../shared/model";
import { TodoActions, TodoActionTypes } from "./todoAction";

export interface TodobyListIdState {
  [listId: string]: Todo[]
}

const sortTodo = (state: TodobyListIdState, action: TodoActions): TodobyListIdState => {
  switch (action.type) {
    case TodoActionTypes.SORT_TODOS_SAME: {
      const list = state[action.data.listId].map(el => {
        if(el.id===action.data.todoId) {
          el.pos = action.data.pos;
        }
        return el;
      });
      return {
        ...state, 
        [action.data.listId]: list.sort((a, b) => a.pos - b.pos)
      };
    }
    case TodoActionTypes.SORT_TODOS_DIFF: {
      const dList = Array.from(state[action.data.dListId]);
      const sList = Array.from(state[action.data.sListId]);
      const target = sList.find(el => el.id===action.data.todoId);
      if(target) {
        target.pos = action.data.pos;
        target.listId = action.data.dListId;
        dList.push(target);
      }
      return {
        ...state,
        [action.data.dListId]: dList.sort((a, b) => a.pos - b.pos),
        [action.data.sListId]: sList.filter(el => el.id !== action.data.todoId)
      };
    }
    default:
      return state;
  }
}; 
const Todos = (state: Todo[], action: TodoActions): Todo[] => {
  switch (action.type) {
    case TodoActionTypes.ADD_TODO:
      return [...state, action.data];
    case TodoActionTypes.EDIT_TODO: 
      return state.map(el => {
        if(el.id!==action.todoId) return el;
        return action.data;
      });
    case TodoActionTypes.DELETE_TODO:
      return state.filter(el => el.id !== action.todoId);
    default:
      return state;
  }
};
export const listByProjectIdReducer = (state: TodobyListIdState={}, action: TodoActions): TodobyListIdState => {
  switch (action.type) {
    case TodoActionTypes.ADD_TODO:
    case TodoActionTypes.EDIT_TODO:
    case TodoActionTypes.DELETE_TODO:{
      console.log(state );
      return {
        ...state,
        [action.listId]: Todos(state[action.listId], action)
      };
    }
    case TodoActionTypes.SORT_TODOS_SAME:
    case TodoActionTypes.SORT_TODOS_DIFF:
      return sortTodo(state, action);
    case TodoActionTypes.RECEIVE_TODOS:
     return {
       ...state, 
       ...action.data
     };
    default:
      return state;
  }
};