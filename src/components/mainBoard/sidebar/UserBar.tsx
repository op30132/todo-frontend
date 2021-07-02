import React, { useState } from "react";
import { BiCog } from "react-icons/bi";
import { FaRegBell } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { userLogout } from "../../../service/authService";
import { RootState } from "../../../store/rootReducer";

const UserBar: React.FC = () => {
  const history = useHistory();
  const [isOpen, setOpen] = useState<boolean>(false);
  const username = useSelector((state: RootState) => state.user.userProfile?.username);
  const logout = () => {
    userLogout().then(() => {
      history.push("/login");
    });
  };
  return (
    <>
      <div className="flex justify-between items-center px-2 relative">
        <h1 className="font-bold text-2xl cursor-pointer" onClick={() => setOpen(!isOpen)}>{username}</h1>
        <div className="flex items-center space-x-2 cursor-pointer">
          <FaRegBell className="text-xl "/>
          <BiCog className="text-2xl "/>
        </div>
        {
          isOpen && (
            <div className="absolute bg-beige rounded-sm p-2 inset-0 transform translate-y-10 cursor-pointer" onClick={logout}>
            logout
            </div>
          )
        }
      </div>
    </>
  );
};

export default UserBar;