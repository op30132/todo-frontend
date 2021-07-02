import { Formik, FormikHelpers, Form, Field } from "formik";
import React from "react";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import DatePicker from "react-datepicker";
import { Todo } from "../../shared/model";
import dayjs from "dayjs";

interface IProps {
  initialState?: Record<string, unknown>;
  isOpen: boolean;
  onHide: () => void;
  todoItem?: Todo;
  onSubmit: (values: Todo) => void;
}

const InsertTaskModal: React.FC<IProps> = ({ isOpen, onHide, todoItem, onSubmit }) => {
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
          title: todoItem?.title || "",
          content: todoItem?.content || "",
          dueDate: todoItem?.dueDate || new Date(),
        }}
        onSubmit={(
          values: Todo
        ) => {
          onSubmit(values);
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
                    selected={dayjs(values.dueDate).toDate()}
                    dateFormat="yyyy/MM/dd"
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