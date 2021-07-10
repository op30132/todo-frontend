import axiosInstance from "../shared/interceptor";
import { Todo, TodoDTO } from "../shared/model";

export const todosByListId = (listId: string): Promise<Todo[]> => {
  return axiosInstance.get(`api/todo/all/${listId}`).then(res => res.data);
};

export const insertTodo = (data: TodoDTO): Promise<Todo> => {
  return axiosInstance.post("api/todo/create", data).then(res => res.data);
};

export const updateTodo = (todoId: string, data: TodoDTO): Promise<Todo> => {
  return axiosInstance.put(`api/todo/${todoId}`, data).then(res => res.data);
};

export const deleteTodo = (todoId: string): Promise<Todo> => {
  return axiosInstance.delete(`api/todo/${todoId}`).then(res => res.data);
};