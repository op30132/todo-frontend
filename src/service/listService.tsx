import axiosInstance from "../shared/interceptor";
import { List, ListDTO } from "../shared/model";

export function getListByProjectId(projectId: string): Promise<List[]> {
  return axiosInstance.get(`/list/all/${projectId}`).then(res => res.data);
}
export function getlistById(listId: string): Promise<List> {
  return axiosInstance.get(`/list/${listId}`).then(res => res.data);
}
export function insertList(data: ListDTO): Promise<List> {
  return axiosInstance.post("/list/create", data).then(res => res.data);
}
export function updateList(listId: string, data: ListDTO): Promise<List> {
  return axiosInstance.put(`/list/${listId}`, data).then(res => res.data);
}
export function deleteList(listId: string): Promise<List> {
  return axiosInstance.delete(`/list/${listId}`).then(res => res.data);
}