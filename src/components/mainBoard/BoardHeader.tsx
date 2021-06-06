import dayjs from "dayjs";
import React from "react";

const BoardHeader: React.FunctionComponent = () => {
  const board=dayjs().format("dddd d, MMMM");

  return (
    <div className="flex justify-between mb-10">
      <h2 className="text-purple text-3xl font-black">{board}</h2>
    </div>
  );
};

export default BoardHeader;