import React from "react";
import { BiCog } from "react-icons/bi";
import { FaRegBell } from "react-icons/fa";
const UserBar = ():JSX.Element => {
	const UserName="Winnie";
	return (
		<div className="flex justify-between items-center px-2">
			<h1 className="font-bold text-2xl cursor-pointer">{UserName}</h1>
			<div className="flex items-center space-x-2 cursor-pointer">
				<FaRegBell className="text-xl "/>
				<BiCog className="text-2xl "/>
			</div>
		</div>
	);
};

export default UserBar;