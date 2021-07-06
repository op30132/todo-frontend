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
      <div className="flex justify-between items-center px-2">
        <h1 className="font-bold text-2xl cursor-pointer">{username}</h1>
        <div className="flex items-center space-x-2 cursor-pointer">
          <FaRegBell className="text-xl " />
          <div className="relative whitespace-nowrap cursor-pointer">
            <BiCog className="text-2xl" onClick={() => setOpen(!isOpen)} />
            <div className={(isOpen ? "static" : "hidden") + " absolute bg-beige rounded-sm p-2 top-0 right-0 bottom-auto left-auto transform translate-y-8"} onClick={logout}>
              <span className="text-purple font-bold">logout</span>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default UserBar;