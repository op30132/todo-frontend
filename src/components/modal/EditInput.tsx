import React, { useState } from "react";
import { useEffect } from "react";

interface IProps {
  defaultValue?: string;
  onSubmit: (val: string) => void
}
const EditInput: React.FC<IProps> = ({defaultValue="", onSubmit}) => {
  const [value, setValue] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const updateValue = (val: string) => {
    if (val === defaultValue) {
      setIsEdit(false);
      return;
    }
    setValue(val);
    setIsEdit(false);
    onSubmit(val);
  };
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  return (
    <>
      {isEdit ? (
        <input type="text" className="text-gray-darkest" autoFocus defaultValue={value} onBlur={() => setIsEdit(false)} onKeyPress={e => (e.key === "Enter" ? updateValue((e.target as HTMLInputElement).value) : "")} />
      ) : (
        <div className="p-2 cursor-pointer border-2 border-gray border-opacity-0" onClick={() => setIsEdit(true)}>{defaultValue}</div>
      )}
    </>
  );
};

export default EditInput;