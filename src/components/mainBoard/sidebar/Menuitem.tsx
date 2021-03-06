import React, { ReactNode } from "react";
import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

interface IProp {
  label: string;
  leftIcon: ReactNode;
  dropList?: ReactNode;
  isActive?: boolean;
}

const Menuitem: React.FC<IProp> = ({ leftIcon, label, dropList, isActive=false}) => {
  const [isOpen, setOpen] = useState(true);
  const openHandler = () => {
    setOpen(current => !current);
  };

  return (
    <>
      <li className="group menuitem hover:bg-beige font-extrabold" onClick={openHandler}>
        <div className={"flex items-center justify-between group-hover:text-purple-light "+(isActive?"text-purple-light":"text-dark")}>
          <div className="flex">
            <span className={"text-xl group-hover:text-purple-light "+(isActive?"text-purple-light":"text-beige-dark")}>
              {leftIcon}
            </span>
            <span className="ml-4">{label}</span>
          </div>
          {dropList !== undefined ? (isOpen ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />) : null}
        </div>
      </li>
      <div className={"overflow-hidden transition-all " + (isOpen ? "h-auto" : "h-0")}>
        <div className="pl-4">
          {dropList}
        </div>
      </div>
    </>
  );
};


export default Menuitem;