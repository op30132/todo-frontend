import { Dispatch } from "react";
import { getCoworkerProjects, getProjects } from "../../service/projectService";
import { Project } from "../../shared/model";

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
export type ProjectActions = requestProjectAction|receiveProjectAction;
