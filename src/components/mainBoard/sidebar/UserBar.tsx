import React from "react";
import { BiCog } from "react-icons/bi";
import { MdNotifications } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { userLogout } from "../../../service/authService";
import { emitDisconnect } from "../../../socket/socket";
import { fetchJoinProject, fetchRejectProject } from "../../../store/project/projectAction";
import { RootState } from "../../../store/rootReducer";
import DropDownMenu from "../../modal/DropDownMenu";

const UserBar: React.FC = () => {
  const history = useHistory();
  const username = useSelector((state: RootState) => state.user.userProfile?.username);
  const invitedProjects = useSelector((state: RootState) => state.projects.invitedProject);
  const dispatch = useDispatch();
  const logout = () => {
    userLogout().then(() => {
      emitDisconnect();
      history.push("/login");
    });
  };

  return (
    <>
      <div className="flex justify-between items-center px-2">
        <h1 className="font-bold text-2xl cursor-pointer">{username}</h1>
        <div className="flex items-center space-x-2 cursor-pointer">
          <DropDownMenu
            trigger={<MdNotifications size={24} color={invitedProjects.length>0?"red":""}/>}
            right={true}
            menu={
              <div className="flex flex-col">
                {(invitedProjects && invitedProjects.length>0) ? (
                  invitedProjects.map(el => (
                    <div className="flex flex-col" key={el.id}>
                      <div>you are invited to<span className="font-bold text-purple">&nbsp;{el.name}&nbsp;</span> project!</div>
                      <div className="mt-2 flex justify-center">
                        <button type="button" className="btn btn-purple-border mr-2" onClick={() => dispatch(fetchJoinProject(el.id))}>Join</button>
                        <button type="button" className="btn btn-purple" onClick={() => dispatch(fetchRejectProject(el.id))}>Reject</button>
                      </div>
                    </div>
                  ))
                ):(
                  <div>no invited Projects</div>
                )}
              </div>
            }  
          />
          <DropDownMenu 
            trigger={<BiCog size={24}/>}
            menu={<span className="text-purple font-bold" onClick={logout}>logout</span>}  
          />
        </div>

      </div>
    </>
  );
};

export default UserBar;