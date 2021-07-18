import { Dispatch } from "react";
import { ThunkDispatch } from "redux-thunk";
import { deleteProject, getCoworkerProjects, getInvitedProjects, getProjectById, getProjects, insertProject, inviteCoworker, joinCoworker, rejectCoworker, removeCoworker, updateProject } from "../../service/projectService";
import { Project, ProjectDTO } from "../../shared/model";
import { changeProject, emitAcceptCoworker, emitInviteCoworker, emitRejectoworker, emitRemoveCoworker } from "../../socket/socket";
import { ProjectState } from "./projectReducer";

export enum ProjectActionTypes {
  REQUEST_PROJECTS = "REQUEST_PROJECTS",
  RECEIVE_PROJECTS = "RECEIVE_PROJECTS",
  RECEIVE_COPROJECTS = "RECEIVE_COPROJECTS",
  GET_PROJECT = "GET_PROJECT",
  ADD_PROJECT = "ADD_PROJECT",
  UPDATE_PROJECT = "UPDATE_PROJECT",
  DELETE_PROJECT = "DELETE_PROJECT",
  JOIN_PROJECT = "JOIN_PROJECT",
  REJECT_PROJECT = "REJECT_PROJECT",
  INVITE_COWORKER = "INVITED_CORKER",
  REMOVE_COWORKER = "REMOVE_COWORKER",
  INVITED_PROJECT = "INVITED_PROJECT",
  REMOVED_PROJECT = "REMOVED_PROJECT"
}
const requestProjects = (): requestProjectAction => ({
  type: ProjectActionTypes.REQUEST_PROJECTS,
});
const receiveProjects = (data: Project[][]):receiveProjectAction => ({
  type: ProjectActionTypes.RECEIVE_PROJECTS,
  data: {
    myProjects: data[0],
    coProjects: data[1],
    invitedProject: data[2]
  }
});
const getProject = (projectId: string, data: Project): getProjectAction => ({
  type: ProjectActionTypes.GET_PROJECT,
  projectId,
  data
});
const addProject = (data: Project): addProjectAction => ({
  type: ProjectActionTypes.ADD_PROJECT,
  data
});
const editProject = (projectId: string, data: Project): editProjectAction => ({
  type: ProjectActionTypes.UPDATE_PROJECT,
  projectId,
  data
});
const delProject = (projectId: string): deleteProjectAction => ({
  type: ProjectActionTypes.DELETE_PROJECT,
  projectId
});
const inviteUser = (projectId: string, data: Project): inviteCoworkerAction => ({
  type: ProjectActionTypes.INVITE_COWORKER,
  projectId,
  data
});
const removeUser = (projectId: string, data: Project): removeCoworkerAction => ({
  type: ProjectActionTypes.REMOVE_COWORKER,
  projectId,
  data
});
const joinProject = (projectId: string, data: Project): joinProjectAction => ({
  type: ProjectActionTypes.JOIN_PROJECT,
  projectId,
  data
});
const rejectProject = (projectId: string): rejectProjectAction => ({
  type: ProjectActionTypes.REJECT_PROJECT,
  projectId
});
export const invitedProject = (data: Project): invitedProjectAction => ({
  type: ProjectActionTypes.INVITED_PROJECT,
  data
});
export const removedProject = (projectId: string): removedProjectAction => ({
  type: ProjectActionTypes.REMOVED_PROJECT,
  projectId
});
export const fetchInsertProject = (data: ProjectDTO) => (dispatch: Dispatch<addProjectAction>): Promise<void> => {
  return insertProject(data).then(res => dispatch(addProject(res)));
};
export const fetchUpdateProject = (projectId: string, data: ProjectDTO) => (dispatch: Dispatch<editProjectAction>): Promise<void> => {
  return updateProject(projectId, data).then(res => {
    dispatch(editProject(projectId, res));
    changeProject(projectId);
  });
};
export const fetchdeleteProject = (projectId: string) => (dispatch: Dispatch<deleteProjectAction>): Promise<void> => {
  return deleteProject(projectId).then(() => dispatch(delProject(projectId)));
};
export const fetchInviteCoworker = (projectId: string, userId: string) => (dispatch: Dispatch<inviteCoworkerAction>): Promise<void> => {
  return inviteCoworker(projectId, {userId}).then(res => {
    dispatch(inviteUser(projectId, res));
    emitInviteCoworker(userId, res);
  });
};
export const fetchRemoveCoworker = (projectId: string, userId: string) => (dispatch: Dispatch<removeCoworkerAction>): Promise<void> => {
  return removeCoworker(projectId, userId).then(res => {
    dispatch(removeUser(projectId, res));
    emitRemoveCoworker(projectId, userId);
  });
};
export const fetchJoinProject = (projectId: string) => (dispatch: Dispatch<joinProjectAction>): Promise<void> => {
  return joinCoworker(projectId).then(res => {
    dispatch(joinProject(projectId, res));
    emitAcceptCoworker(projectId);
  });
};
export const fetchRejectProject = (projectId: string) => (dispatch: Dispatch<rejectProjectAction>): Promise<void> => {
  return rejectCoworker(projectId).then(() => {
    dispatch(rejectProject(projectId));
    emitRejectoworker(projectId);
  });
};
export const fetchProjects = () => (dispatch: Dispatch<ProjectActions>): Promise<void> => {
  dispatch(requestProjects());
  return Promise.all([
    getProjects(),
    getCoworkerProjects(),
    getInvitedProjects()
  ]).then((res) => {
    dispatch(receiveProjects(res));
  });
};
export const fetchProjectById = (projectId: string) => (dispatch: Dispatch<getProjectAction>): Promise<void> => {
  return getProjectById(projectId).then(res => dispatch(getProject(projectId, res)));
};
export type ProjectDispatch = ThunkDispatch<ProjectState, void, ProjectActions>;
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
    invitedProject: Project[];
  }
}
interface getProjectAction extends IReduxBaseAction {
  projectId: string;
  type: ProjectActionTypes.GET_PROJECT;
  data: Project;
}
interface addProjectAction extends IReduxBaseAction {
  type: ProjectActionTypes.ADD_PROJECT;
  data: Project;
}
interface editProjectAction extends IReduxBaseAction {
  type: ProjectActionTypes.UPDATE_PROJECT;
  projectId: string;
  data: Project;
}
interface deleteProjectAction extends IReduxBaseAction {
  type: ProjectActionTypes.DELETE_PROJECT;
  projectId: string; 
}
interface joinProjectAction extends IReduxBaseAction {
  type: ProjectActionTypes.JOIN_PROJECT;
  projectId: string;
  data: Project;
}
interface rejectProjectAction extends IReduxBaseAction {
  type: ProjectActionTypes.REJECT_PROJECT;
  projectId: string; 
}
interface invitedProjectAction extends IReduxBaseAction {
  type: ProjectActionTypes.INVITED_PROJECT;
  data: Project; 
}
interface removedProjectAction extends IReduxBaseAction {
  type: ProjectActionTypes.REMOVED_PROJECT;
  projectId: string; 
}
interface inviteCoworkerAction extends IReduxBaseAction {
  type: ProjectActionTypes.INVITE_COWORKER;
  projectId: string;
  data: Project; 
}
interface removeCoworkerAction extends IReduxBaseAction {
  type: ProjectActionTypes.REMOVE_COWORKER;
  projectId: string;
  data: Project; 
}
export type ProjectActions = removedProjectAction|requestProjectAction|receiveProjectAction|addProjectAction|editProjectAction|deleteProjectAction|joinProjectAction|rejectProjectAction|invitedProjectAction|inviteCoworkerAction|getProjectAction|removeCoworkerAction;
