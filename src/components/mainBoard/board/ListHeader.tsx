import dayjs from "dayjs";
import React from "react";

const ListHeader: React.FC = () => {
  const board=dayjs().format("dddd D, MMMM");

  return (
    <div className="flex justify-between mb-10">
      <h2 className="text-purple text-3xl font-black">{board}</h2>
    </div>
  );
};

export default ListHeader;