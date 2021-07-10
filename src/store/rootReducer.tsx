import { combineReducers } from "redux";
import { listsReducer } from "./list/listReducer";
import { userReducer } from "./user/userReducer";
import { createSelector } from "reselect";
import { ProjectReducer } from "./project/projectReducer";
import { listByProjectIdReducer } from "./todo/todoReducer";

export const rootReducer = combineReducers({
  lists: listsReducer,
  user: userReducer,
  projects: ProjectReducer,
  todos: listByProjectIdReducer
});

export const getListsSelector = createSelector(
  [
    (state: RootState) => state.lists.listsbyProjectId,
    (state: RootState) => state.lists.curProject
  ],
  (listsbyProjectId, curProject) => listsbyProjectId[curProject.projectId]
);
export const getCurrentProject = createSelector(
  [
    (state: RootState) => state.lists.curProject.projectId,
    (state: RootState) => state.projects
  ],
  (curProjectId, projects) => projects.myProjects?.find(el => el.id===curProjectId) || projects.coworkerProjects?.find(el => el.id===curProjectId)
);
export const getTodosByListId = createSelector(
  [
    (state: RootState) => state.todos,
    (_: unknown, listId: string) => listId
  ],
  (todos, listId) => todos[listId]
);
export type RootState = ReturnType<typeof rootReducer> 