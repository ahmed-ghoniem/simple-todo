import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TaskState } from '../models/task-state.enum';
import { TaskModel } from '../models/task.model';

@Injectable({
	providedIn: 'root'
})
export class TaskDataService {
	AllTasks: Array<TaskModel> = [];

	private _tasksSubject = new BehaviorSubject<Array<TaskModel>>(this.AllTasks);
	tasksObservable = this._tasksSubject.asObservable();

	constructor() {
		this.initData();
	}

	initData() {
		const data = localStorage.getItem('myTodoTasks');
		this.AllTasks = JSON.parse(data) || new Array<TaskModel>();
		this._tasksSubject.next(this.AllTasks);
	}
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

	addTask(task: TaskModel) {
		this.AllTasks.push(task);
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
