import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { RootState } from "../store/rootReducer";
import { getUserProfile } from "../store/user/userAction";
interface IProps extends RouteProps {
  exact?: boolean;
  path: string;
  component: React.ComponentType<RouteProps>;
}
const PrivateRoute: React.FC<IProps> = ({component: Component, ...rest}: IProps) => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(!user.userProfile) {
      dispatch(getUserProfile());
    }
  }, []);

  if(!user.isfetched || user.isFetching) {
    return  <> loooooooooooooooading</>; 
  }
  return (
    <Route {...rest} render={props => (
      user.userProfile
        ? <Component {...props}/>
        : <Redirect to={{
          pathname: "/login",
          state: {from: props.location}
        }} />
    )
    } 
    />
  );
};
export default PrivateRoute;