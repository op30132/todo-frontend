import { Project } from "../../shared/model";
import { ProjectActions, ProjectActionTypes } from "./projectAction";

export interface ProjectState {
  isFetching: boolean;
  isFetched: boolean;
  myProjects: Project[];
  coworkerProjects: Project[];
}
const initialProjectState= {
  isFetching: false,
  isFetched: false,
  myProjects: [],
  coworkerProjects: []
};
const project = (state: Project[]=[], action: ProjectActions): Project[] => {
  switch (action.type) {
  case ProjectActionTypes.ADD_PROJECT:
    return [...state, action.data];
  case ProjectActionTypes.EDIT_PROJECT:
    return state.map(el => {
      if(el.id!== action.projectId) return el;
      return action.data;
    });
  case ProjectActionTypes.DELETE_PROJECT:
    return state.filter(el => el.id !== action.projectId);
  default:
    return state;
  }
};
export const ProjectReducer = (state: ProjectState = initialProjectState, action: ProjectActions): ProjectState => {
  switch (action.type) {
  case ProjectActionTypes.ADD_PROJECT:
  case ProjectActionTypes.EDIT_PROJECT:
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
      isFetching: false,
      isFetched: true,
      myProjects: action.data.myProjects,
      coworkerProjects: action.data.coProjects
    };
  default:
    return state;
  }
};

