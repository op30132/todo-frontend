import { UserProfile } from "../../shared/model";
import { PROFILE_RECEIVE, PROFILE_REQUEST } from "./userAction";

export interface UserState {
  isFetching: boolean;
  isfetched: boolean;
  userProfile?: UserProfile | null;
}

export interface UserAction {
  type: string;
  userProfile?: UserProfile;
}
const initialState = {
  isFetching: false,
  isfetched: false,
  userProfile: null as (null | UserProfile)
};

export const userReducer = (state: UserState = initialState, action: UserAction): UserState => {
  switch (action.type) {
  case PROFILE_REQUEST:
    return {
      ...state,
      isFetching: true
    };
  case PROFILE_RECEIVE:
    return {
      isFetching: false,
      isfetched: true,
      userProfile: action.userProfile
    };
  default:
    return state;
  }
};