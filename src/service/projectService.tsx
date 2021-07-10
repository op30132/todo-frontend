import { Project } from "../shared/model";
import axiosInstance from "../shared/interceptor";

export function getProjects(): Promise<Project[]>{
  return axiosInstance.get("api/project/myProjects").then(res => res.data);
}

export function getCoworkerProjects(): Promise<Project[]> {
  return axiosInstance.get("api/project/coworkerProjects").then(res => res.data);
}

