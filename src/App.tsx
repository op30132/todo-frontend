import React from "react";

import "./App.css";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";

const App = ():JSX.Element => {
	return (
		<div className="flex h-screen antialiased text-gray-900 bg-gray-100">
			<Sidebar></Sidebar>
			<div className="flex flex-col flex-1 min-h-screen overflow-x-hidden overflow-y-auto">
				<main className="flex px-4 pb-8 items-start min-h-full">
					<Main></Main>
				</main>
			</div>
		</div>
	);
};

export default App;
