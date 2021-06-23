import axios from "axios";
import { Project } from "../models/model";
import axiosInstance from "../shared/interceptor";

export function getProjectList():Promise<Project[]> {
  return axiosInstance.get("api/project/myProjects").then(res => res.data).catch(err => {
    alert(err);
  });
}

export function getCoworkerProjectList():Promise<Project[]> {
  return axiosInstance.get("api/project/coworkerProjects").then(res => res.data).catch(err => {
    alert(err);
  });
}