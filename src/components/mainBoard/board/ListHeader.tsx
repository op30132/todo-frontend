import dayjs from "dayjs";
import React from "react";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdateProject } from "../../../store/project/projectAction";
import { getCurrentProject } from "../../../store/rootReducer";
import EditInput from "../../modal/EditInput";

const ListHeader: React.FC = () => {
  const currentProject = useSelector(getCurrentProject);
  const time = dayjs().format("dddd D, MMMM");
  const dispatch = useDispatch();
  const updateProject = (val: string) => {
    const data = {name: val};
    dispatch(fetchUpdateProject(currentProject?.id||"", data));
  };
  const inviteCoworker = () => {
    console.log();
  };
  console.log(currentProject?.coworker);
  return (
    <div className="mb-1 mt-6 mx-4 ">
      <h2 className="text-purple text-3xl font-black">{time}</h2>
      <div className="flex pt-2">
        <div className="inline-block align-top text-purple font-bold">
          <EditInput defaultValue={currentProject?.name} onSubmit={updateProject}/>
        </div>
        <div className="flex">
          {
            currentProject?.coworker && currentProject?.coworker.map(el => (
              <div key={el.id} className="bg-beige-dark text-white rounded-full mr-1 h-10 w-10 text-center leading-10 font-bold text-lg cursor-pointer">{el?.username[0].toUpperCase()}</div>
            ))
          }
          <div onClick={inviteCoworker} className="border-2 border-beige-dark text-beige-dark hover:bg-beige-dark hover:text-white rounded-full mx-1 h-10 w-10 font-bold cursor-pointer flex items-center justify-center"><MdAdd size={26}/></div>
        </div>
      </div>
    </div>
  );
};

export default ListHeader;