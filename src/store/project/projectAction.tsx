import { Dispatch } from "react";
import { deleteProject, getCoworkerProjects, getProjects, insertProject, updateProject } from "../../service/projectService";
import { Project, ProjectDTO } from "../../shared/model";

export enum ProjectActionTypes {
  REQUEST_PROJECTS = "REQUEST_PROJECTS",
  RECEIVE_PROJECTS = "RECEIVE_PROJECTS",
  RECEIVE_COPROJECTS = "RECEIVE_COPROJECTS",
  ADD_PROJECT = "ADD_PROJECT",
  EDIT_PROJECT = "EDIT_PROJECT",
  DELETE_PROJECT = "DELETE_PROJECT",
}
const requestProjects = (): requestProjectAction => ({
  type: ProjectActionTypes.REQUEST_PROJECTS,
});
const receiveProjects = (data: Project[][]):receiveProjectAction => ({
  type: ProjectActionTypes.RECEIVE_PROJECTS,
  data: {
    myProjects: data[0],
    coProjects: data[1]
  }
});
const addProject = (data: Project): addProjectAction => ({
  type: ProjectActionTypes.ADD_PROJECT,
  data
});
const editProject = (projectId: string, data: Project): editProjectAction => ({
  type: ProjectActionTypes.EDIT_PROJECT,
  projectId,
  data
});
const delProject = (projectId: string): deleteProjectAction => ({
  type: ProjectActionTypes.DELETE_PROJECT,
  projectId
});
export const fetchInsertProject = (data: ProjectDTO) => (dispatch: Dispatch<addProjectAction>): Promise<void> => {
  return insertProject(data).then(res => dispatch(addProject(res)));
};
export const fetchUpdateProject = (projectId: string, data: ProjectDTO) => (dispatch: Dispatch<editProjectAction>): Promise<void> => {
  console.log(data);
  return updateProject(projectId, data).then(res => dispatch(editProject(projectId, res)));
};
export const fetchdeleteProject = (projectId: string) => (dispatch: Dispatch<deleteProjectAction>): Promise<void> => {
  return deleteProject(projectId).then(() => dispatch(delProject(projectId)));
};
export const fetchProjects = () => (dispatch: Dispatch<ProjectActions>): Promise<void> => {
  dispatch(requestProjects());
  return Promise.all([
    getProjects(),
    getCoworkerProjects()
  ]).then((res) => {
    dispatch(receiveProjects(res));
  });
};
interface IReduxBaseAction {
  type: ProjectActionTypes;
}
interface requestProjectAction extends IReduxBaseAction {
  type: ProjectActionTypes.REQUEST_PROJECTS;
}
interface receiveProjectAction extends IReduxBaseAction {
  type: ProjectActionTypes.RECEIVE_PROJECTS;
  data: {
    myProjects: Project[];
    coProjects: Project[];
  }
}
interface addProjectAction extends IReduxBaseAction {
  type: ProjectActionTypes.ADD_PROJECT;
  data: Project;
}
interface editProjectAction extends IReduxBaseAction {
  type: ProjectActionTypes.EDIT_PROJECT;
  projectId: string;
  data: Project;
}
interface deleteProjectAction extends IReduxBaseAction {
  type: ProjectActionTypes.DELETE_PROJECT;
  projectId: string; 
}
export type ProjectActions = requestProjectAction|receiveProjectAction|addProjectAction|editProjectAction|deleteProjectAction;
