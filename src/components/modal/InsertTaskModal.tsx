import { Formik, FormikHelpers, Form, Field } from "formik";
import React, { FunctionComponent } from "react";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";

export type ModalProps = {
  initialState?: Record<string, unknown>;
  isOpen: boolean;
  onHide: () => void
}
interface Values {
  firstName: string;
  lastName: string;
  email: string;
}
const InsertTaskModal: FunctionComponent<ModalProps> = ({ isOpen, onHide }) => {
  return (
    <Modal
      className="modal modal-sm"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={onHide}
      shouldReturnFocusAfterClose={false}
    >
      <div className="modal-header">
        <h3 className="text-xl font-black">add Task</h3>
        <div className="close" onClick={onHide}><IoClose /></div>
      </div>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}>
        <Form>
          <div className="modal-content">
            <div className="flex">
              <label htmlFor="firstName" className="w-4/12">First Name</label>
              <Field id="firstName" name="firstName" className="w-8/12" placeholder="John" autoFocus />
            </div>
            <div className="flex">
              <label htmlFor="lastName" className="w-4/12">Last Name</label>
              <Field id="lastName" name="lastName" className="w-8/12" placeholder="Doe" />
            </div>
            <div className="flex">
              <label htmlFor="email" className="w-4/12">Email</label>
              <Field id="email" name="email" placeholder="john@acme.com" className="w-8/12" type="email" />
            </div>
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn">Submit</button>
          </div>
        </Form>
      </Formik>
    </Modal>
  );
};


export default InsertTaskModal;