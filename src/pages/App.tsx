import React from "react";
import ReactModal from "react-modal";
import { BrowserRouter as Router, Route, Switch, } from "react-router-dom";
import Main from "../components/mainBoard/Main";
import Sidebar from "../components/sidebar/Sidebar";

import "./App.css";
import Login from "./login/Login";


const App: React.FunctionComponent = () => {
	ReactModal.setAppElement("#root");

	return (
		<Router>
			<Login />
			<Switch>
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
