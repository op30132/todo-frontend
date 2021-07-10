import { Project } from "../../shared/model";
import { ProjectActions, ProjectActionTypes } from "./projectAction";

export interface ProjectState {
  isFetching: boolean;
  isFetched: boolean;
  myProjects?: Project[];
  coworkerProjects?: Project[];
}
const initialProjectState= {
  isFetching: false,
  isFetched: false,
  myProjects: [],
  coworkerProjects: []
};
export const ProjectReducer = (state: ProjectState = initialProjectState, action: ProjectActions): ProjectState => {
  switch (action.type) {
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

