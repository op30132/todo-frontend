import React, { ReactNode, useState } from "react";

interface IProps {
  trigger: ReactNode;
  menu: ReactNode;
  right?: boolean;
  hover?: boolean;
}
const DropDownMenu: React.FC<IProps> = ({trigger, menu, right=false, hover=false}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative whitespace-nowrap cursor-pointer">
      <div onClick={hover ? () => null :() => setIsOpen(!isOpen)} onMouseOver={hover? () => setIsOpen(!isOpen): () => null} onMouseOut={hover? () => setIsOpen(!isOpen): () => null}>
        {trigger}
      </div>
      <div className={(isOpen ? "static" : "hidden") + (right? " right-auto left-0" : " right-0 left-auto") +
      " absolute z-10 bg-beige border-2 border-beige-darker rounded-md p-2 top-full bottom-auto transform translate-y-1"}>
        <div className="flex flex-col">
          {menu}
        </div>
      </div>
    </div>
  );
};

export default DropDownMenu;