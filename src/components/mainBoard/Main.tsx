import React from "react";
import Board from "./Board";
import BoardHeader from "./BoardHeader";

const Main: React.FunctionComponent = () => {
	return (
		<div className="h-full py-12 px-8 bg-beige-light">
			<BoardHeader/>
			<Board/>
		</div>
	);
};


export default Main;