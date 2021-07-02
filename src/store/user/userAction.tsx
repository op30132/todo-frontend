import { Dispatch } from "react";
import { fetchUserProfile, getRefreshToken } from "../../service/authService";
import inMemoryJwt from "../../shared/inMemoryJwt";
import { UserProfile } from "../../shared/model";
import { UserAction } from "./userReducer";

export const PROFILE_REQUEST = "PROFILE_REQUEST";
export const PROFILE_RECEIVE = "PROFILE_RECEIVE";
export const LOGOUT = "LOGOUT";

const requestProfile = () => ({ type: PROFILE_REQUEST });
const receiveProfile = (user: UserProfile) => ({ type: PROFILE_RECEIVE, userProfile: user });

export const getUserProfile = () => (dispatch: Dispatch<UserAction>): Promise<void> => {
  dispatch(requestProfile());
  const fetchUser = () => fetchUserProfile()
    .then(res => dispatch(receiveProfile(res)));
  if(inMemoryJwt.getToken()) {
    return fetchUser();
  }
  return getRefreshToken().then(() => fetchUser());
};
