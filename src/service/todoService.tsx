import { AxiosResponse } from "axios";
import axiosInstance from "../shared/interceptor";
import { Todo } from "../shared/model";

export const getTodosByListId = (listId: string) => (): Promise<AxiosResponse<Todo[]>> => {
  return axiosInstance.get(`api/todo/all/${listId}`);
};

export const insertTodo = (data: Todo): Promise<AxiosResponse<Todo>> => {
  return axiosInstance.post("api/todo/create", data).then(res => res.data);
};

export const updateTodo = (data: Todo): Promise<AxiosResponse<Todo>> => {
  return axiosInstance.put(`api/todo/${data.id}`, data).then(res => res.data);
};