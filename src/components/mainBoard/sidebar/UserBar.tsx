import React from "react";
import { BiCog } from "react-icons/bi";
import { FaRegBell } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { userLogout } from "../../../service/authService";
import { RootState } from "../../../store/rootReducer";
import DropDownMenu from "../../modal/DropDownMenu";

const UserBar: React.FC = () => {
  const history = useHistory();
  const username = useSelector((state: RootState) => state.user.userProfile?.username);
  const logout = () => {
    userLogout().then(() => {
      history.push("/login");
    });
  };
  return (
    <>
      <div className="flex justify-between items-center px-2">
        <h1 className="font-bold text-2xl cursor-pointer">{username}</h1>
        <div className="flex items-center space-x-2 cursor-pointer">
          <FaRegBell className="text-xl " />
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