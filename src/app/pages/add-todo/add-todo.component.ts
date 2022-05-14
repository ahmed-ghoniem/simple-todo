import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskDataService } from 'src/app/services/task-data.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { TaskModel } from 'src/app/models/task.model';
import { TaskState } from 'src/app/models/task-state.enum';
@Component({
	selector: 'app-add-todo',
	templateUrl: './add-todo.component.html',
	styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {
	GroupData: Array<object> = [];
	todoForm: FormGroup;
	constructor(
		private TaskDataService: TaskDataService,
		private validationService: FormValidatorService
	) {
		this.GroupData = TaskDataService.getGroupData();
	}

	ngOnInit(): void {
		this.initForm();
	}

	private initForm() {
		this.todoForm = new FormGroup({
			title: new FormControl(null, [Validators.required]),
			description: new FormControl(null, [Validators.required]),
			date: new FormControl(null, [Validators.required]),
			group: new FormControl(null, [Validators.required]),
			priority: new FormControl(null)
		});
	}

	get todoFormControl() {
		return this.todoForm.controls;
	}

	hasError(itemName, errorName) {
		if (
			(this.todoFormControl[itemName].dirty || this.todoFormControl[itemName].touched) &&
			this.todoFormControl[itemName].invalid
		) {
			if (this.todoFormControl[itemName].errors[errorName]) {
				return true;
			}
		}
	}

	onSubmit(todoForm) {
		console.log(todoForm.value);
		if (todoForm.invalid) {
			this.validationService.validateAllFormFields(todoForm);
			return;
		}
		let newTask: TaskModel = {
			id: this.TaskDataService.getTaskData().length + 2,
			title: todoForm.value.title,
			date: todoForm.value.date,
			state: TaskState.new,
			groupId: todoForm.value.group,
			groupName: 'group' + todoForm.value.group,
			description: todoForm.value.description,
			isDeleted: false
		};
		this.TaskDataService.addTask(newTask);
		this.todoForm.reset();
	}

	resetForm() {
		this.todoForm.reset();
	}
}
