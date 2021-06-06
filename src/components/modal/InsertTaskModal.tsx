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
  title: string;
  content: string;
  dueDate: string;
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
          title: "",
          content: "",
          dueDate: "",
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
            <div className="flex mb-4">
              <label htmlFor="title" className="w-2/12">Title</label>
              <Field id="title" name="title" className="w-10/12" autoFocus />
            </div>
            <div className="flex mb-4">
              <label htmlFor="dueDate" className="w-2/12">DueDate</label>
              <Field id="dueDate" name="dueDate" className="w-10/12" type="dueDate" />
            </div>
            <div className="flex mb-4">
              <label htmlFor="content" className="w-2/12">content</label>
              <Field id="content" name="content" component="textarea" rows="4" className="w-10/12"/>
            </div>
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-purple">Submit</button>
          </div>
        </Form>
      </Formik>
    </Modal>
  );
};


export default InsertTaskModal;