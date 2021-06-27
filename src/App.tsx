import React from "react";
import ReactModal from "react-modal";
import { BrowserRouter as Router, Redirect, Route, Switch, } from "react-router-dom";
import "./App.css";
import Login from "./components/login";
import Register from "./components/register";
import PrivateRoute from "./shared/privateRoute";

const MainBoard = React.lazy(() => import("./components/mainBoard"));

const App: React.FC = () => {
  ReactModal.setAppElement("#root");
  return (
    <React.Suspense fallback={<span>loading...</span>}>
      <Router>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <PrivateRoute path="/home" component={MainBoard}/>
          <Redirect exact from="/" to="/login"/>
        </Switch>
      </Router>
    </React.Suspense>
  );
};

export default App;
