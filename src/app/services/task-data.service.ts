import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TaskState } from '../models/task-state.enum';
import { TaskModel } from '../models/task.model';

@Injectable({
	providedIn: 'root'
})
export class TaskDataService {
	AllTasks: Array<TaskModel> = [
		{
			id: 1,
			title: 'task1',
			date: '2022-01-01',
			state: TaskState.new,
			groupId: 1,
			groupName: 'group1',
			isDeleted: false
		},
		{
			id: 2,
			title: 'task2',
			date: '2022-05-16',
			state: TaskState.done,
			groupId: 1,
			groupName: 'group1',
			isDeleted: false
		},
		{
			id: 3,
			title: 'task3',
			date: '2022-01-12',
			state: TaskState.new,
			groupId: 2,
			groupName: 'group2',
			isDeleted: false
		},
		{
			id: 4,
			title: 'task4',
			date: '2022-02-02',
			state: TaskState.done,
			groupId: 2,
			groupName: 'group2',
			isDeleted: false
		},
		{
			id: 5,
			title: 'task5',
			date: '2022-03-03',
			state: TaskState.new,
			groupId: 3,
			groupName: 'group3',
			isDeleted: false
		},
		{
			id: 6,
			title: 'task1',
			date: '2022-03-03',
			state: TaskState.new,
			groupId: 3,
			groupName: 'group3',
			isDeleted: false
		},
		{
			id: 7,
			title: 'task1',
			date: '2022-01-01',
			state: TaskState.new,
			groupId: 3,
			groupName: 'group3',
			isDeleted: false
		},
		{
			id: 8,
			title: 'task1',
			date: '2022-05-04',
			state: TaskState.new,
			groupId: 3,
			groupName: 'group3',
			isDeleted: false
		},
		{
			id: 9,
			title: 'task1',
			date: '2022-05-05',
			state: TaskState.new,
			groupId: 3,
			groupName: 'group3',
			isDeleted: false
		},
		{
			id: 10,
			title: 'task1',
			date: '2022-01-01',
			state: TaskState.new,
			groupId: 4,
			groupName: 'group4',
			isDeleted: false
		},
		{
			id: 12,
			title: 'task1',
			date: '2022-01-01',
			state: TaskState.new,
			groupId: 4,
			groupName: 'group4',
			isDeleted: false
		},
		{
			id: 13,
			title: 'task1',
			date: '2022-01-01',
			state: TaskState.new,
			groupId: 4,
			groupName: 'group4',
			isDeleted: false
		},
		{
			id: 14,
			title: 'task1',
			date: '2022-05-14',
			state: TaskState.new,
			groupId: 4,
			groupName: 'group4',
			isDeleted: false
		},
		{
			id: 15,
			title: 'task1',
			date: '2022-05-15',
			state: TaskState.new,
			groupId: 4,
			groupName: 'group4',
			isDeleted: false
		},
		{
			id: 16,
			title: 'task1',
			date: '2022-06-06',
			state: TaskState.new,
			groupId: 4,
			groupName: 'group4',
			isDeleted: false
		}
	];

	private _tasksSubject = new BehaviorSubject<Array<TaskModel>>(this.AllTasks);
	tasksObservable = this._tasksSubject.asObservable();

	constructor() {}

	allGroups = [
		{ id: 1, name: 'group1' },
		{ id: 2, name: 'group2' },
		{ id: 3, name: 'group3' },
		{ id: 4, name: 'group4' }
	];

	getTaskData() {
		return this.AllTasks;
	}

	getGroupData() {
		return this.allGroups;
	}

	updateLocalStorage() {
		localStorage.setItem('myTodoTasks', JSON.stringify(this.AllTasks));
	}

	deleteSelectedTasks(selectedTasks) {
		this.AllTasks.filter((task) => selectedTasks.includes(task.id)).forEach(
			(t) => (t.isDeleted = true)
		);
		this.syncTasks();
	}

	deleteTask(taskId) {
		this.AllTasks.filter((task) => task.id === taskId).forEach((t) => (t.isDeleted = true));
		this.syncTasks();
	}

	syncTasks() {
		this._tasksSubject.next(this.AllTasks);
		this.updateLocalStorage();
	}

	getTaskById(taskId) {
		const task = this.AllTasks.find((task) => {
			return task.id == taskId;
		});
		return task;
	}

	changeTaskState(taskId, taskStatus: TaskState) {
		const task = this.AllTasks.find((task) => {
			return task.id == taskId;
		});
		task.state = taskStatus;
		this.syncTasks();
	}

	changeTodoTaskState(selectedTasks, taskStatus: TaskState) {
		this.AllTasks.filter((task) => selectedTasks.includes(task.id)).forEach(
			(t) => (t.state = taskStatus)
		);
		this.syncTasks();
	}
}
