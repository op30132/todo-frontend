import { AxiosResponse } from "axios";
import axiosInstance from "../shared/interceptor";
import { List } from "../shared/model";

export function getlistbyProjectId(projectId: string): Promise<AxiosResponse<List[]>> {
  return axiosInstance.get(`api/list/all/${projectId}`);
}