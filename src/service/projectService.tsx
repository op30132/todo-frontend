import { Project, ProjectDTO } from "../shared/model";
import axiosInstance from "../shared/interceptor";

export function getProjects(): Promise<Project[]>{
  return axiosInstance.get("api/project/myProjects").then(res => res.data);
}

export function getCoworkerProjects(): Promise<Project[]> {
  return axiosInstance.get("api/project/coworkerProjects").then(res => res.data);
}

export function insertProject(data: ProjectDTO): Promise<Project> {
  return axiosInstance.post("api/Project/create", data).then(res => res.data);
}

export function updateProject(projectId: string, data: ProjectDTO): Promise<Project> {
  return axiosInstance.put(`api/Project/${projectId}`, data).then(res => res.data);
}

export function deleteProject(projectId: string): Promise<Project> {
  return axiosInstance.delete(`api/list/${projectId}`).then(res => res.data);
}