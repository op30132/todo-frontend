import { Project } from "../../shared/model";
import { ProjectActions, ProjectActionTypes } from "./projectAction";

export interface ProjectState {
  isError: boolean;
  isFetching: boolean;
  isFetched: boolean;
  myProjects: Project[];
  coworkerProjects: Project[];
  invitedProject: Project[];
}
const initialProjectState= {
  isError: false,
  isFetching: false,
  isFetched: false,
  myProjects: [],
  coworkerProjects: [],
  invitedProject: []
};
const project = (state: Project[]=[], action: ProjectActions): Project[] => {
  switch (action.type) {
  case ProjectActionTypes.ADD_PROJECT:
    return [...state, action.data];
  case ProjectActionTypes.GET_PROJECT:
  case ProjectActionTypes.UPDATE_PROJECT:
    return state.map(el => el.id!== action.projectId ? el : action.data );
  case ProjectActionTypes.DELETE_PROJECT:
    return state.filter(el => el.id !== action.projectId);
  default:
    return state;
  }
};
export const ProjectReducer = (state: ProjectState = initialProjectState, action: ProjectActions): ProjectState => {
  switch (action.type) {
  case ProjectActionTypes.GET_PROJECT:
  case ProjectActionTypes.ADD_PROJECT:
  case ProjectActionTypes.UPDATE_PROJECT:
  case ProjectActionTypes.DELETE_PROJECT:{
    return {  
      ...state, 
      myProjects: project(state.myProjects, action)
    };
  }
  case ProjectActionTypes.REQUEST_PROJECTS:
    return {
      ...state,
      isFetching: true
    };
  case ProjectActionTypes.RECEIVE_PROJECTS:
    return {
      ...state,
      isFetching: false,
      isFetched: true,
      myProjects: action.data.myProjects,
      coworkerProjects: action.data.coProjects,
      invitedProject: action.data.invitedProject
    };
  case ProjectActionTypes.JOIN_PROJECT:
    return {
      ...state,
      invitedProject: state.invitedProject.filter(el => el.id !== action.projectId),
      coworkerProjects: [...state.coworkerProjects, action.data]
    };
  case ProjectActionTypes.REJECT_PROJECT:
    return {
      ...state,
      invitedProject: state.invitedProject.filter(el => el.id !== action.projectId)
    };
  case ProjectActionTypes.INVITE_COWORKER:
  case ProjectActionTypes.REMOVE_COWORKER:
    return {
      ...state,
      myProjects: state.myProjects.map(el => el.id!==action.projectId? el: action.data)
    };
  case ProjectActionTypes.INVITED_PROJECT:
    return {
      ...state,
      invitedProject: [...state.invitedProject, action.data]
    };
  case ProjectActionTypes.REMOVED_PROJECT:
    return {
      ...state, 
      coworkerProjects: state.coworkerProjects.filter(el => el.id!==action.projectId)
    };
  default:
    return state;
  }
};

