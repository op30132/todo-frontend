import React from "react";
import Menuitem from "./Menuitem";
import { AiTwotoneCalendar } from "react-icons/ai";
import { MdAssessment } from "react-icons/md";
import { HiFolder } from "react-icons/hi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsSquareFill } from "react-icons/bs";
import { BiArchiveIn } from "react-icons/bi";


const Menu: React.FunctionComponent = () => {
	return (
		<div className="mt-9">
			<ul className="space-y-1">
				<Menuitem>
					<AiTwotoneCalendar className="text-xl text-beige-dark group-hover:text-purple-light"/>
					<span className="ml-4">Today</span>
				</Menuitem>
				<Menuitem>
					<MdAssessment className="text-xl text-beige-dark group-hover:text-purple-light"/>
					<span className="ml-4">Uncategorries</span>
				</Menuitem>
				<li className="group menuitem">
					<div className="flex justify-between items-center text-dark">
						<div className="flex">
							<HiFolder className="text-xl text-beige-dark"/>
							<span className="ml-4">Project</span>
						</div>
						<MdKeyboardArrowDown/>
					</div>
				</li>
				<div role="menu" x-data="open = false" className="mt-2 pl-4 space-y-2" aria-label="Dashboards">
					<Menuitem>
						<BsSquareFill className="text-xs text-red"/>
						<span className="ml-4">time app</span>
					</Menuitem>
					<Menuitem>
						<BsSquareFill className="text-xs text-cyan"/>
						<span className="ml-4">private work</span>
					</Menuitem>
				</div>
				<Menuitem>
					<BiArchiveIn className="text-xl text-beige-dark group-hover:text-purple-light"/>
					<span className="ml-4">Archived</span>
				</Menuitem>
			</ul>

		</div>
	);
};


export default Menu;