import { TaskState } from './task-state.enum';

export class TaskModel {
	id: number;
	isDeleted: boolean;
	title: string;
	date: string;
	state: TaskState;
	description?: string;
	groupId: number;
	groupName: string;
}
