import React from "react";
import Menuitem from "./Menuitem";
import { AiTwotoneCalendar } from "react-icons/ai";
import { MdAssessment } from "react-icons/md";
import { HiFolder } from "react-icons/hi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BiArchiveIn } from "react-icons/bi";
import {getCoworkerProjectList, getProjectList} from "../../../service/projectService";
import { useApi } from "../../../hook/UseAxios";
import { Project } from "../../../models/model";


const Menu: React.FunctionComponent = () => {
  const [projects, error, isLoading] = useApi<Project[]>(getProjectList);

  return (
    <div className="mt-9">
      <ul className="space-y-1">
        <Menuitem>
          <AiTwotoneCalendar className="text-xl text-beige-dark group-hover:text-purple-light"/>
          <span className="ml-4">Calendar</span>
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
          { isLoading && <p>Loading data...</p> }
          { error && <p>An error occurred</p> }
          {
            projects && projects.map(el => (
              <Menuitem key={el.id}>
                <MdAssessment className="text-xl text-beige-dark group-hover:text-purple-light"/>
                <span className="ml-4">{el.name}</span>
              </Menuitem>
            ))
          }
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