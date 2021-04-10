import React from "react";
import { BrowserRouter as Router, } from "react-router-dom";
import Main from "../components/mainBoard/Main";
import Sidebar from "../components/sidebar/Sidebar";

import "./App.css";


const App: React.FunctionComponent = () => {
	return (
		<Router>
			<div className="flex h-screen antialiased text-gray-dark">
				<Sidebar></Sidebar>
				<div className="flex flex-col flex-1 min-h-screen overflow-x-hidden overflow-y-auto">
					<Main></Main>
				</div>
			</div>
		</Router>
	);
};

export default App;
