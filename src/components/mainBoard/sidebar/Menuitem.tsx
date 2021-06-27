import React from "react";

const Menuitem: React.FC = (props) => {
  return (
    <li className="group menuitem hover:bg-beige font-extrabold">
      <div className="flex items-center text-dark group-hover:text-purple-light">
        {props.children}
      </div>
    </li>
  );
};


export default Menuitem;