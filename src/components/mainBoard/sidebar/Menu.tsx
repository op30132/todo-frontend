import React, { useEffect } from "react";
import Menuitem from "./Menuitem";
import { AiTwotoneCalendar } from "react-icons/ai";
import { MdAssessment } from "react-icons/md";
import { HiFolder } from "react-icons/hi";
import { BiArchiveIn } from "react-icons/bi";
import { getCoworkerProjects, getProjects} from "../../../service/projectService";
import { Project } from "../../../shared/model";
import useApi from "../../../hook/UseAxios";
import { useDispatch } from "react-redux";
import { fetchLists } from "../../../store/project/projectAction";


const Menu: React.FC = () => {
  const [projects, error, isLoading] = useApi<Project[]>(getProjects);
  const [guest, gerror, gisLoading] = useApi<Project[]>(getCoworkerProjects);
  const dispatch = useDispatch();

  useEffect(() => {
    if(projects && projects.length > 0) {
      dispatch(fetchLists(projects[0].id));
    }
  }, [projects]);


  return (
    <div className="mt-9">
      <ul className="space-y-1">
        <div></div>
        <Menuitem leftIcon={<AiTwotoneCalendar/>} label={"Calendar"} />
        <Menuitem leftIcon={<HiFolder/>} label={"Project"} dropList={
          <div className="mt-2 pl-4 space-y-2">
            { isLoading && <p>Loading data...</p> }
            { error && <p>An error occurred</p> }
            {
              projects && projects.map(el => (
                <div key={el.id} onClick={() => dispatch(fetchLists(el.id))}>
                  <Menuitem  leftIcon={<MdAssessment/>} label={el.name || ""} />
                </div>
              ))
            }
          </div>
        }/>
        <Menuitem leftIcon={<HiFolder/>} label={"Guest Project"} dropList={
          <div className="mt-2 pl-4 space-y-2">
            { gisLoading && <p>Loading data...</p> }
            { gerror && <p>An error occurred</p> }
            {
              guest && guest.map(el => (
                <div key={el.id} onClick={() => dispatch(fetchLists(el.id))}>
                  <Menuitem  leftIcon={<MdAssessment/>} label={el.name || ""} />
                </div>
              ))
            }
          </div>
        }/>
        <Menuitem leftIcon={<BiArchiveIn/>} label={"Archived"} />
      </ul>
    </div>
  );
};


export default Menu;