import React, { useEffect } from "react";
import Menuitem from "./Menuitem";
import { MdAssessment } from "react-icons/md";
import { HiFolder } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { fetchLists } from "../../../store/list/listAction";
import { RootState } from "../../../store/rootReducer";
import { fetchProjects } from "../../../store/project/projectAction";


const Menu: React.FC = () => {
  const project = useSelector((state: RootState) => state.projects);
  const curProjectId = useSelector((state: RootState) => state.lists.curProject.projectId);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!project.isFetched) {
      dispatch(fetchProjects());
    }
    if (project.myProjects && project.myProjects.length > 0) {
      dispatch(fetchLists(project.myProjects[0].id));
    }
  }, [project.myProjects]);

  const selectProject = (projectId: string) => {
    if(projectId===curProjectId) {
      return;
    }
    dispatch(fetchLists(projectId));
  };

  return (
    <div className="mt-9">
      <ul className="space-y-1">
        <div></div>
        {/* <Menuitem leftIcon={<AiTwotoneCalendar />} label={"Calendar"} /> */}
        <Menuitem leftIcon={<HiFolder />} label={"Project"} dropList={
          <>
            {project.isFetching && <p>Loading data...</p>}
            {
              project.myProjects && project.myProjects.map(el => (
                <div key={el.id} onClick={() => selectProject(el.id)}>
                  <Menuitem leftIcon={<MdAssessment />} label={el.name} isActive={el.id===curProjectId} />
                </div>
              ))
            }
          </>
        } />
        <Menuitem leftIcon={<HiFolder />} label={"Guest Project"} dropList={
          <>
            {project.isFetching && <p>Loading data...</p>}
            {
              project.coworkerProjects && project.coworkerProjects.map(el => (
                <div key={el.id} onClick={() => selectProject(el.id)}>
                  <Menuitem leftIcon={<MdAssessment />} label={el.name} isActive={el.id===curProjectId} />
                </div>
              ))
            }
          </>
        } />
        {/* <Menuitem leftIcon={<BiArchiveIn />} label={"Archived"} /> */}
      </ul>
    </div>
  );
};


export default Menu;