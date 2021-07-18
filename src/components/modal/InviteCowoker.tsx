import React from "react";
import { useState } from "react";
import { MdClear } from "react-icons/md";
import Modal from "react-modal";
import UserInfoQuery from "./UserInfoQuery";

interface IProps {
  isOpen: boolean;
  onHide: () => void;
  onSubmit: (val: string) => void;
}

const InviteCowoker:React.FC<IProps> = ({ isOpen, onHide, onSubmit }) => {
  const [userId, setuserId] = useState("");
  const [isSelected, setSelected] = useState(false);

  const onSelectChange = (val: boolean) => {
    setSelected(val);
  };
  return (
    <Modal
      className="modal modal-sm"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={onHide}
      shouldReturnFocusAfterClose={false}
    >
      <div className="modal-header">
        <h3 className="text-xl font-black">Invite Coworker</h3>
        <div className="close" onClick={onHide}><MdClear/></div>
      </div>
      <div className="modal-content">
        <div className="flex mb-4">
          <label htmlFor="email" className="w-2/12">Email</label>
          <div className="w-8/12">
            <UserInfoQuery onSelect={val => setuserId(val)} isSelected={isSelected} setSelected={onSelectChange}/>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button type="submit" className="btn btn-purple" disabled={!userId && !isSelected} onClick={() => onSubmit(userId)}>Submit</button>
      </div>
    </Modal>
  );
};
export default InviteCowoker;