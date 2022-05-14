import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TaskState } from 'src/app/models/task-state.enum';
import { TaskModel } from 'src/app/models/task.model';
import { TaskDataService } from 'src/app/services/task-data.service';
@Component({
	selector: 'app-task',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
	@Input() task: TaskModel;
	@Output() deleteTask: EventEmitter<any> = new EventEmitter();
	@Output() changeState: EventEmitter<any> = new EventEmitter();
	@Output() selectedTasks: EventEmitter<any> = new EventEmitter();
	constructor(private TaskDataService: TaskDataService) {}

	ngOnInit(): void {}

	delete(taskId) {
		this.deleteTask.emit(taskId);
	}

	changeTaskState(task: TaskModel) {
		this.changeState.emit({
			id: task.id,
			state: task.state == TaskState.done ? TaskState.new : TaskState.done
		});
	}

	selectTask(taskId) {
		this.selectedTasks.emit(taskId);
	}
}
