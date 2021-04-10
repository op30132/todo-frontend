import React from "react";
import { Task } from "../../models/model";
import Taskitem from "./Taskitem";

const Board: React.FunctionComponent = () => {
	const taskList: Task[]=[{
		tid: 1,
		title: "Task",
		todos: [
			{did: 11, content: "Set up github repo", isComplete: true, creator: {
				id: 111,
				name: "winnie"
			}, dueDate: new Date()},
			{did: 22, content: "Write basic server that authenticate User", isComplete: false, creator: {
				id: 111,
				name: "winnie"
			}, dueDate: new Date()},
		]
	},{
		tid: 2,
		title: "buy",
		todos: [
			{did: 33, content: "buy tissue", isComplete: true, creator: {
				id: 111,
				name: "winnie"
			}, dueDate: new Date()},
		]
	}];
	return (
		<div className="flex flex-wrap">
			{
				taskList.map(task => {
					return <Taskitem key={task.tid} task={task} />;
				})
			}
		</div>
	);
};


export default Board;