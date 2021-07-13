import { Formik, Form, Field } from "formik";
import React from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import { TodoDTO } from "../../shared/model";
import dayjs from "dayjs";
import { MdClear } from "react-icons/md";

interface IProps {
  isOpen: boolean;
  onHide: () => void;
  todoItem: TodoDTO | null;
  onSubmit: (values: TodoDTO) => void;
  deleteItem: () => void
}

const InsertTaskModal: React.FC<IProps> = ({ isOpen, onHide, todoItem, onSubmit, deleteItem }) => {
  const isEdit = !!todoItem;
  return (
    <Modal
      className="modal modal-sm"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={onHide}
      shouldReturnFocusAfterClose={false}
    >
      <div className="modal-header">
        <h3 className="text-xl font-black">{isEdit? "Edit Task":"Add Task"}</h3>
        <div className="close" onClick={onHide}><MdClear /></div>
      </div>
      <Formik
        initialValues={{
          title: todoItem?.title || "",
          content: todoItem?.content || "",
          dueDate: todoItem?.dueDate || new Date(),
        } as TodoDTO}
        onSubmit={(
          values: TodoDTO
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
                    dateFormat="yyyy/MM/dd h:mm a"
                    name="dueDate"
                    showTimeSelect
                    onChange={date => setFieldValue("dueDate", date)}
                  />
                </div>
              </div>
              <div className="flex mb-4">
                <label htmlFor="content" className="w-2/12">content</label>
                <Field id="content" name="content" component="textarea" rows="4" className="w-10/12" />
              </div>
            </div>
            <div className="modal-footer">
              {
                isEdit && <button type="button" className="btn btn-red mr-2" onClick={deleteItem}>delete</button>
              }
              <button type="submit" className="btn btn-purple" disabled={isSubmitting}>Submit</button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};


export default InsertTaskModal;