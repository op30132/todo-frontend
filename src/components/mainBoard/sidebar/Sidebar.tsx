import React from "react";
import Menu from "./Menu";
import UserBar from "./UserBar";

const Sidebar:React.FC= () => {
  return (
    <aside className="flex-shrink-0 hidden w-64 md:block border-r border-beige">
      <nav className="flex flex-col h-full px-5 py-12">
        <UserBar/>
        <Menu/>
      </nav>
    </aside>
  );
};

export default Sidebar;