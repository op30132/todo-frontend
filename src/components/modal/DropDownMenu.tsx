import React, { ReactNode, useState } from "react";

interface IProps {
  trigger: ReactNode;
  menu: ReactNode;
}
const DropDownMenu: React.FC<IProps> = ({trigger, menu}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative whitespace-nowrap cursor-pointer">
      <div onClick={() => setIsOpen(!isOpen)} >
        {trigger}
      </div>
      <div className={(isOpen ? "static" : "hidden") + " absolute bg-beige border-2 border-beige-darker rounded-md p-2 top-0 right-0 bottom-auto left-auto transform translate-y-8"}>
        <div className="flex flex-col">
          {menu}
        </div>
      </div>
    </div>
  );
};

export default DropDownMenu;