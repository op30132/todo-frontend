import { Project, ProjectDTO } from "../shared/model";
import axiosInstance from "../shared/interceptor";

export function getProjects(): Promise<Project[]>{
  return axiosInstance.get("/project/myProjects").then(res => res.data);
}
export function getCoworkerProjects(): Promise<Project[]> {
  return axiosInstance.get("/project/coworkerProjects").then(res => res.data);
}
export function getProjectById(projectId: string): Promise<Project>{
  return axiosInstance.get(`/project/${projectId}`).then(res => res.data);
}
export function insertProject(data: ProjectDTO): Promise<Project> {
  return axiosInstance.post("/project/create", data).then(res => res.data);
}
export function updateProject(projectId: string, data: ProjectDTO): Promise<Project> {
  return axiosInstance.put(`/project/${projectId}`, data).then(res => res.data);
}
export function deleteProject(projectId: string): Promise<Project> {
  return axiosInstance.delete(`/project/${projectId}`).then(res => res.data);
}
export function inviteCoworker(projectId: string, data: {userId: string}): Promise<Project> {
  return axiosInstance.post(`/project/${projectId}/coworker/invite`, data).then(res => res.data);
}
export function removeCoworker(projectId: string, userId: string): Promise<Project> {
  return axiosInstance.delete(`/project/${projectId}/coworker/${userId}`).then(res => res.data);
}
export function joinCoworker(projectId: string): Promise<Project> {
  return axiosInstance.post(`/project/${projectId}/coworker/join`).then(res => res.data);
}
export function rejectCoworker(projectId: string): Promise<Project> {
  return axiosInstance.post(`/project/${projectId}/coworker/reject`).then(res => res.data);
}
export function getInvitedProjects(): Promise<Project[]> {
  return axiosInstance.get("/project/invitedProjects").then(res => res.data);
}