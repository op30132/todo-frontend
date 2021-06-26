import axios, { AxiosResponse } from "axios";
import { Project } from "../models/model";
import axiosInstance from "../shared/interceptor";

export function getProjectList(): Promise<AxiosResponse<Project[]>>{
  return axiosInstance.get("api/project/myProjects");
}

export function getCoworkerProjectList(): Promise<AxiosResponse<Project[]>> {
  return axiosInstance.get("api/project/coworkerProjects");
}