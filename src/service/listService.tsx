import { AxiosResponse } from "axios";
import axiosInstance from "../shared/interceptor";
import { List } from "../shared/model";

export function getListByProjectId(projectId: string): Promise<AxiosResponse<List[]>> {
  return axiosInstance.get(`api/list/all/${projectId}`);
}

export function insertList(data: any): Promise<AxiosResponse<List>> {
  return axiosInstance.post("api/list/create", data).then(res => res.data);
}

export function updateList(projectId: string, data: any): Promise<AxiosResponse<List>> {
  return axiosInstance.put(`api/list/${projectId}`, data).then(res => res.data);
}