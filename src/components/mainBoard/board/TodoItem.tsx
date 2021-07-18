import dayjs from "dayjs";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { Todo } from "../../../shared/model";

interface IProps {
  todo: Todo;
  index: number;
  clickEvent: (todo: Todo) => void;
  onCompleted: (todo: Todo) => void;
}

const TodoItem: React.FC<IProps> = ({ todo, index, clickEvent, onCompleted }) => {
  return (
    <Draggable draggableId={todo.id} index={index}>
      {provided => (
        <div
          className="mb-2"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="taskitem bg-white shadow cursor-pointer" onClick={() => clickEvent(todo)}>
            <div className="flex items-start ">
              <div className="mr-2" onClick={(e) => { e.stopPropagation(); onCompleted(todo); }}>
                {todo.isComplete ?
                  <MdCheckBox size={24} className="text-purple" /> :
                  <MdCheckBoxOutlineBlank size={24} className="text-gray" />}
              </div>
              <span className="text-gray-dark font-semibold">{todo.title}</span>
            </div>
            <span className="ml-8 text-beige-dark text-base">{dayjs(todo.dueDate).format("M/D h:mm a")}</span>
          </div>
        </div>
      )}
    </Draggable>

  );
};

export default React.memo(TodoItem);