import { Field, Form, Formik } from "formik";
import React from "react";
import { MdClear } from "react-icons/md";
import Modal from "react-modal";

interface IProps {
  isOpen: boolean;
  onHide: () => void;
  onSubmit: () => void;
}

const InviteCowoker:React.FC<IProps> = ({ isOpen, onHide }) => {
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
        <div className="close" onClick={onHide}><MdClear /></div>
      </div>
      <Formik
        initialValues={{
          email: ""
        }}
        onSubmit={(
          values: any
        ) => {
          console.log(values);
        }}>
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <div className="modal-content">
              <div className="flex mb-4">
                <label htmlFor="email" className="w-2/12">Title</label>
                <Field id="email" name="email" className="w-10/12" autoFocus type="email"/>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-purple" disabled={isSubmitting}>Submit</button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default InviteCowoker;