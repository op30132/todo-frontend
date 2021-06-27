import * as React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import inMemoryJwt from "./inMemoryJwt";
interface IProps extends RouteProps {
  exact?: boolean;
  path: string;
  component: React.ComponentType<RouteProps>;
}
const PrivateRoute: React.FC<IProps> = ({component: Component, ...rest}: IProps) => (
  <Route {...rest} render={props => (
    inMemoryJwt.getToken() !== undefined
      ? <Component {...props}/>
      : <Redirect to={{
        pathname: "/login",
        state: {from: props.location}
      }} />
  )} 
  />
);
export default PrivateRoute;