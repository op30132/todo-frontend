import { combineReducers } from "redux";
import { listReducer } from "./list/listReducer";
import { userReducer } from "./user/userReducer";

export const rootReducer = combineReducers({
  lists: listReducer,
  user: userReducer
});

export type RootState = ReturnType<typeof rootReducer>