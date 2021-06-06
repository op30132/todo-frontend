import { Formik, FormikHelpers, Form, Field } from "formik";
import React, { FunctionComponent } from "react";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import DatePicker from "react-datepicker";
export type ModalProps = {
  initialState?: Record<string, unknown>;
  isOpen: boolean;
  onHide: () => void
}
interface Values {
  title: string;
  content: string;
  dueDate: Date;
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
          dueDate: new Date(),
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
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <div className="modal-content">
              <div className="flex mb-4">
                <label htmlFor="title" className="w-2/12">Title</label>
                <Field id="title" name="title" className="w-10/12" autoFocus />
              </div>
              <div className="flex mb-4">
                <label htmlFor="dueDate" className="w-2/12">DueDate</label>
                <div className="w-10/12">
                  <DatePicker
                    selected={values.dueDate}
                    dateFormat="MMMM d, yyyy"
                    name="dueDate"
                    onChange={date => setFieldValue("dueDate", date)}
                  />
                </div>
              </div>
              <div className="flex mb-4">
                <label htmlFor="content" className="w-2/12">content</label>
                <Field id="content" name="content" component="textarea" rows="4" className="w-10/12"/>
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


export default InsertTaskModal;