import axiosInstance from "../shared/interceptor";
import { List, ListDTO } from "../shared/model";

export function getListByProjectId(projectId: string): Promise<List[]> {
  return axiosInstance.get(`api/list/all/${projectId}`).then(res => res.data);
}

export function insertList(data: ListDTO): Promise<List> {
  return axiosInstance.post("api/list/create", data).then(res => res.data);
}

export function updateList(listId: string, data: ListDTO): Promise<List> {
  return axiosInstance.put(`api/list/${listId}`, data).then(res => res.data);
}

export function deleteList(listId: string): Promise<List> {
  return axiosInstance.delete(`api/list/${listId}`).then(res => res.data);
}