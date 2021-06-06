import React from "react";
interface MyProps {
  children?: React.ReactNode
}
const Menuitem: React.FunctionComponent<MyProps>= (props) => {
  return (
    <li className="group menuitem hover:bg-beige font-extrabold">
      <div className="flex items-center text-dark group-hover:text-purple-light">
        {props.children}
      </div>
    </li>
  );
};


export default Menuitem;