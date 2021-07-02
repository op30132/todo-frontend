import { combineReducers } from "redux";
import { lists } from "./project/projectReducer";
import { user } from "./user/userReducer";

export const rootReducer = combineReducers({
  lists,
  user
});

export type RootState = ReturnType<typeof rootReducer>