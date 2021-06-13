import React from "react";
import ReactModal from "react-modal";
import { BrowserRouter as Router, Redirect, Route, Switch, } from "react-router-dom";
import "./App.css";
import Main from "./components/mainBoard";
import Sidebar from "./components/mainBoard/sidebar/Sidebar";
import Login from "./components/login";
import Register from "./components/register";


const App: React.FunctionComponent = () => {
  ReactModal.setAppElement("#root");

  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/home">
          <div className="flex h-screen antialiased text-gray-dark">
            <Sidebar></Sidebar>
            <div className="flex flex-col flex-1 min-h-screen overflow-x-hidden overflow-y-auto">
              <Main></Main>
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
