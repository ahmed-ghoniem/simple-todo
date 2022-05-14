import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskDataService } from 'src/app/services/task-data.service';
@Component({
	selector: 'app-todo-details',
	templateUrl: './todo-details.component.html',
	styleUrls: ['./todo-details.component.scss']
})
export class TodoDetailsComponent implements OnInit {
	taskId: number;
	taskObj: any;
	constructor(private route: ActivatedRoute, private TaskDataService: TaskDataService) {}

	ngOnInit(): void {
		this.taskId = this.route.snapshot.params.id;
		this.taskObj = this.TaskDataService.getTaskById(this.taskId);
		console.log('this.taskObj', this.taskObj);
	}
}
