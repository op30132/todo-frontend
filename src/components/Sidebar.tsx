import React from "react";

const Sidebar = ():JSX.Element => {
	return (
		<aside className="flex-shrink-0 hidden w-64 bg-blue border-r md:block">
			<div className="flex flex-col h-full">
				<nav aria-label="Main" className="flex-1 px-2 py-4 space-y-2 overflow-y-hidden hover:overflow-y-auto">

				</nav>
			</div>
		</aside>
	);
};

export default Sidebar;