import { AxiosResponse } from "axios";
import { Project } from "../shared/model";
import axiosInstance from "../shared/interceptor";

export function getProjects(): Promise<AxiosResponse<Project[]>>{
  return axiosInstance.get("api/project/myProjects");
}

export function getCoworkerProjects(): Promise<AxiosResponse<Project[]>> {
  return axiosInstance.get("api/project/coworkerProjects");
}