import { Dispatch } from "react";
import { ThunkDispatch } from "redux-thunk";
import { deleteTodo, insertTodo, updateTodo } from "../../service/todoService";
import { Todo, TodoDTO } from "../../shared/model";
import { TodobyListIdState } from "./todoReducer";

export enum TodoActionTypes {
  REQUEST_TODOS = "REQUEST_TODOS",
  RECEIVE_TODOS = "RECEIVE_TODOS",
  SORT_TODOS_SAME = "SORT_TODOS_SAME",
  SORT_TODOS_DIFF = "SORT_TODOS_DIFF",
  ADD_TODO = "ADD_TODO",
  EDIT_TODO = "EDIT_TODO",
  DELETE_TODO = "DELETE_TODO",
}
// const requestTodos = (listId: string): requestTodoAction => ({
//   type: TodoActionTypes.REQUEST_TODOS,
//   listId,
// });
export const receiveTodos = (data: {[key: string]: Todo[]}):receiveTodoAction => ({
  type: TodoActionTypes.RECEIVE_TODOS,
  data
});
export const sortTodosInSameList = (data: sameSort): sortSameTodoAction => ({
  type: TodoActionTypes.SORT_TODOS_SAME,
  data,
});
export const sortTodosInDiffList = (data: diffSort): sortDiffTodoAction => ({
  type: TodoActionTypes.SORT_TODOS_DIFF,
  data,
});
const addTodo = (listId: string, data: Todo): addTodoAction => ({
  type: TodoActionTypes.ADD_TODO,
  listId,
  data
});
const editTodo = (listId: string, todoId: string, data: Todo): editTodoAction => ({
  type: TodoActionTypes.EDIT_TODO,
  listId,
  todoId,
  data
});
const delTodo = (listId: string, todoId: string): deleteTodoAction => ({
  type: TodoActionTypes.DELETE_TODO,
  listId,
  todoId
});
export const fetchInsertTodo = (data: TodoDTO) => (dispatch: Dispatch<addTodoAction>): Promise<void> => {
  return insertTodo(data).then(res => dispatch(addTodo(res.listId, res)));
};
export const fetchUpdateTodo = (todoId: string, data: TodoDTO) => (dispatch: Dispatch<editTodoAction>): Promise<void> => {
  return updateTodo(todoId, data).then(res => dispatch(editTodo(res.listId, todoId,res)));
};
export const fetchdeleteTodo = (listId: string, todoId: string) => (dispatch: Dispatch<deleteTodoAction>): Promise<void> => {
  return deleteTodo(todoId).then(() => dispatch(delTodo(listId, todoId)));
};
// export const fetchTodos = (listId: string) => (dispatch: Dispatch<TodoActions>): Promise<void> => {
//   dispatch(requestTodos(listId));
//   return getTodosByListId(listId)
//     .then(res => dispatch(receiveTodos(listId, res)));
// };
export type TodoDispatch = ThunkDispatch<TodobyListIdState, void, TodoActions>;
interface IReduxBaseAction {
  type: TodoActionTypes;
}
interface requestTodoAction extends IReduxBaseAction {
  type: TodoActionTypes.REQUEST_TODOS;
  listId: string;
}
export interface receiveTodoAction extends IReduxBaseAction {
  type: TodoActionTypes.RECEIVE_TODOS;
  data: {
    [listId: string]: Todo[];
  }
}
interface sortSameTodoAction extends IReduxBaseAction {
  type: TodoActionTypes.SORT_TODOS_SAME;
  data: sameSort;
}
interface sortDiffTodoAction extends IReduxBaseAction {
  type: TodoActionTypes.SORT_TODOS_DIFF;
  data: diffSort;
}
interface addTodoAction extends IReduxBaseAction {
  type: TodoActionTypes.ADD_TODO;
  listId: string;
  data: Todo;
}
interface editTodoAction extends IReduxBaseAction {
  type: TodoActionTypes.EDIT_TODO;
  listId: string;
  todoId: string;
  data: Todo;
}
interface deleteTodoAction extends IReduxBaseAction {
  type: TodoActionTypes.DELETE_TODO;
  listId: string;
  todoId: string; 
}
interface sameSort {
  todoId: string;
  listId: string;
  pos: number;
}
interface diffSort {
  todoId: string;
  sListId: string;
  dListId: string;
  pos: number;
}
export type TodoActions = requestTodoAction|receiveTodoAction|sortSameTodoAction|sortDiffTodoAction|addTodoAction|editTodoAction|deleteTodoAction;
