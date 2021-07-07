import dayjs from "dayjs";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { FiCheckCircle } from "react-icons/fi";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { Todo } from "../../../shared/model";

interface IProps {
  todo: Todo;
  index: number;
  clickEvent: (todo: Todo) => void;
  onCompleted: (todo: Todo) => void;
}

const TodoItem: React.FC<IProps> = ({ todo, index, clickEvent, onCompleted }) => {
  return (
    <Draggable draggableId={todo.id || ""} index={index}>
      {provided => (
        <div
          className="mb-3"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="taskitem bg-white shadow cursor-pointer" onClick={() => clickEvent(todo)}>
            <div className="flex items-start ">
              <div className="mr-4 mt-1" onClick={(e) => { e.stopPropagation(); onCompleted(todo); }}>
                {todo.isComplete ?
                  <FiCheckCircle className="text-purple text-lg" /> :
                  <RiCheckboxBlankCircleLine className="text-gray text-xl" />}
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

export default TodoItem;