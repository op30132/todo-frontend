import { ThunkDispatch } from "redux-thunk";
import io, { Socket } from "socket.io-client";
import { List, Project } from "../shared/model";
import { addList, delList, editList, fetchLists, ListActions } from "../store/list/listAction";
import { fetchProjectById, invitedProject, ProjectActions, removedProject } from "../store/project/projectAction";
import { RootState } from "../store/rootReducer";
import store from "../store/store";
import { fetchTodosByListId, TodoActions } from "../store/todo/todoAction";
const url = "ws://localhost:3001";
let client: Socket;

export const clientInit = (): void => {
  client = io(url,{
    transports:["websocket"],
    auth: {
      userId: store.getState().user.userProfile?.id
    }
  });
  client.on("send_message", (data: unknown) => {
    console.log(data);
  });
  client.on("getInvited", (data: Project) => {
    console.log(data);
    store.dispatch(invitedProject(data));
  });
  client.on("getRemoved", async (projectId: string) => {
    (store.dispatch as ThunkDispatch<RootState, void, ProjectActions>)(fetchLists(store.getState().projects.myProjects[0].id));
    store.dispatch(removedProject(projectId));
  });
  client.on("accentYourProject", (projectId: string) => {
    (store.dispatch as ThunkDispatch<RootState, void, ProjectActions>)(fetchProjectById(projectId));
  });
  client.on("rejectYourProject", (projectId: string) => {
    (store.dispatch as ThunkDispatch<RootState, void, ProjectActions>)(fetchProjectById(projectId));
  });
  client.on("listRefresh", (listId: string) => {
    (store.dispatch as ThunkDispatch<RootState, void, TodoActions>)(fetchTodosByListId(listId));
  });
  client.on("listAdded", (data: List) => {
    (store.dispatch as ThunkDispatch<RootState, void, ListActions>)(addList(data));
  });
  client.on("listUpdated", (data: List) => {
    (store.dispatch as ThunkDispatch<RootState, void, ListActions>)(editList(data.id, data));
  });
  client.on("listDeleted", (listId: string) => {
    (store.dispatch as ThunkDispatch<RootState, void, ListActions>)(delList(listId));
  });
  client.on("projectFresh", (projectId: string) => {
    (store.dispatch as ThunkDispatch<RootState, void, ProjectActions>)(fetchProjectById(projectId));
  });
};

export const emitInviteCoworker = (userId: string, data: Project): void => {
  client.emit("inviteCoworker", {userId, data});
};
export const emitRemoveCoworker = (projectId: string, userId: string): void => {
  client.emit("removeCoworker", {projectId, userId});
};
export const emitAcceptCoworker = (projectId: string): void => {
  client.emit("acceptCoworker", projectId);
};
export const emitRejectoworker = (projectId: string): void => {
  client.emit("rejectCoworker", projectId);
};
export const emitJoinProject = (projectId: string): void => {
  client.emit("joinProject", projectId);
};
export const emitAddList = (data: List): void => {
  client.emit("addList", {projectId: store.getState().lists.curProject.projectId}, data);
};
export const emitUpdateList = (data: List): void => {
  client.emit("updateList", {projectId: store.getState().lists.curProject.projectId, data});
};
export const emitDeleteList = (listId: string): void => {
  client.emit("deleteList", {listId, projectId: store.getState().lists.curProject.projectId});
};
export const emitChangeTodo = (listId: string): void => {
  client.emit("changeTodoinList", {listId, projectId: store.getState().lists.curProject.projectId});
};
export const changeProject = (projectId: string): void => {
  client.emit("changeProject", projectId);
};
export const disconnect = (): void => {
  client.close();
};