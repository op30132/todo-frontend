import dayjs from "dayjs";
import React from "react";
import { useState } from "react";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchInviteCoworker, fetchRemoveCoworker, fetchUpdateProject, ProjectDispatch } from "../../../store/project/projectAction";
import { getCurrentProject, RootState } from "../../../store/rootReducer";
import DropDownMenu from "../../modal/DropDownMenu";
import EditInput from "../../modal/EditInput";
import InviteCowoker from "../../modal/InviteCowoker";

const ListHeader: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.userProfile);
  const currentProject = useSelector(getCurrentProject);
  const [isOpen, setIsOpen] = useState(false);
  const time = dayjs().format("dddd D, MMMM");
  const dispatch = useDispatch<ProjectDispatch>();
  const updateProject = (val: string) => {
    if(currentProject) {
      const data = {name: val};
      dispatch(fetchUpdateProject(currentProject.id, data));
    }
  };
  const onInviteSubmit = (userId: string) => {
    if(currentProject) {
      dispatch(fetchInviteCoworker(currentProject.id, userId)).then(() => setIsOpen(false));
    }
  };
  return (
    <div className="mb-1 mt-6 mx-4">
      <h2 className="text-purple text-3xl font-black">{time}</h2>
      <div className="flex pt-2">
        <div className="inline-block align-top text-purple font-bold">
          <EditInput defaultValue={currentProject?.name} onSubmit={updateProject}/>
        </div>
        <div className="flex">
          {
            currentProject?.coworker && currentProject?.coworker.map(el => (
              <DropDownMenu key={el.id}
                right={true}
                trigger={
                  <div className="avatar">{el.username[0].toUpperCase()}</div>
                }
                menu={
                  <div>
                    <h2 className="text-purple font-bold text-lg">{el.username}</h2>
                    <div className="mb-2">{el.email}</div>
                    { user && user.id === currentProject.owner && (
                      <button type="button" className="btn btn-purple" onClick={() => dispatch(fetchRemoveCoworker(currentProject.id,el.id))}>Remove</button>
                    )}
                  </div>
                }  
              />
            ))
          }
          {
            currentProject?.invitingUser && currentProject?.invitingUser.map(el => (
              <DropDownMenu key={el.id}
                right={true}
                hover={true}
                trigger={
                  <div className="avatar filter brightness-75">{el.username[0].toUpperCase()}</div>
                }
                menu={
                  <span>inviting...</span>
                }  
              />
            ))
          }
          <div onClick={() => setIsOpen(true)} className="border-2 border-beige-dark text-beige-dark hover:bg-beige-dark hover:text-white rounded-full mx-1 h-10 w-10 font-bold cursor-pointer flex items-center justify-center"><MdAdd size={26}/></div>
        </div>
      </div>
      <InviteCowoker isOpen={isOpen} onHide={() => setIsOpen(false)} onSubmit={onInviteSubmit}/>
    </div>
  );
};

export default ListHeader;