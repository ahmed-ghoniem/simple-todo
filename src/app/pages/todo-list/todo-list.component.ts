import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FilterDatePipe } from 'src/app/directives/filter-date.pipe';
import { FilterGroupsPipe } from 'src/app/directives/filter-groups.pipe';
import { DeletedPipe, FilterTitlePipe, StatePipe } from 'src/app/directives/filter-title.pipe';
import { FilterType } from 'src/app/models/filter-type.enum';
import { FilterModel } from 'src/app/models/filter.model';
import { TaskState } from 'src/app/models/task-state.enum';
import { TaskDataService } from 'src/app/services/task-data.service';

@Component({
	selector: 'app-todo-list',
	templateUrl: './todo-list.component.html',
	styleUrls: ['./todo-list.component.scss'],
	providers: [FilterTitlePipe, FilterDatePipe, FilterGroupsPipe, DeletedPipe, StatePipe, DatePipe]
})
export class TodoListComponent implements OnInit, OnDestroy {
	DefaultGroupProperty = 'groupName';
	GroupData: Array<object> = [];
	selectedTasks: Array<any> = [];
	dateFilterVal;
	titleFilterVal;
	groupFilterVal;
	tasks = new Array<any>();
	firstPageQuestions = [];
	taskSubscription: Subscription;
	routeFilter: FilterType;
	routeGroup;
	filterType = FilterType;
	dateFormat = 'yyyy-MM-dd';
	constructor(
		private _activatedRoute: ActivatedRoute,
		private TaskDataService: TaskDataService,
		private filterDate: FilterDatePipe,
		private filterGroupsPipe: FilterGroupsPipe,
		private filterTitlePipe: FilterTitlePipe,
		private filterDeletedPipe: DeletedPipe,
		private filterStatePipe: StatePipe,
		private datePipe: DatePipe
	) {}

	ngOnInit(): void {
		this.GroupData = this.TaskDataService.getGroupData();
		this.taskSubscription = this.TaskDataService.tasksObservable.subscribe((tasks) => {
			this.tasks = tasks;
		});

		this._activatedRoute.queryParamMap.subscribe((params) => {
			this.routeFilter = +params.get('type');
			this.routeGroup = +params.get('group');
		});
	}

	ngOnDestroy(): void {
		if (this.taskSubscription) {
			this.taskSubscription.unsubscribe();
			this.taskSubscription = null;
		}
	}

	get TaskData() {
		let results = [];
		const filterModel = new FilterModel();
		filterModel.title = this.titleFilterVal;
		filterModel.groups = this.groupFilterVal;
		filterModel.fromDate = this.dateFilterVal;
		switch (this.routeFilter) {
			case this.filterType.all:
				filterModel.deleted = null;
				break;
			case this.filterType.today:
				filterModel.fromDate = this.datePipe.transform(new Date(), this.dateFormat);
				break;
			case this.filterType.week:
				filterModel.fromDate = this.getFirstDayOfWeekDate();
				filterModel.toDate = this.getLastDayOfWeekDate();
				break;
			case this.filterType.done:
				filterModel.state = TaskState.done;
				break;
			case this.filterType.new:
				filterModel.state = TaskState.new;
				break;
			case this.filterType.group:
				filterModel.groups = [this.routeGroup];
				break;
			case this.filterType.deleted:
				filterModel.deleted = true;
				break;
		}
		results = this.applyAllFilters(this.tasks, filterModel);
		return this.groupBy(results);
	}

	applyAllFilters(results, filterModel: FilterModel) {
		results = this.filterTitlePipe.transform(results, filterModel.title);
		results = this.filterDate.transform(results, filterModel.fromDate, filterModel.toDate);
		results = this.filterGroupsPipe.transform(results, filterModel.groups);
		results = this.filterStatePipe.transform(results, filterModel.state);
		results = this.filterDeletedPipe.transform(results, filterModel.deleted);
		return results;
	}

	deleteTask(taskId) {
		this.TaskDataService.deleteTask(taskId);
	}

	changeState(event) {
		this.TaskDataService.changeTaskState(event.id, event.state);
	}

	selectTasks(taskId) {
		if (!this.selectedTasks.includes(taskId)) {
			this.selectedTasks.push(taskId);
		} else {
			const index = this.selectedTasks.indexOf(taskId);
			if (index > -1) {
				this.selectedTasks.splice(index, 1);
			}
		}
	}

	groupBy(list, property = 'groupName') {
		const results = (list || []).reduce((groups, item) => {
			const val = item[property];
			groups[val] = groups[val] || {};
			groups[val].name = item[property];
			groups[val].tasks = groups[val].tasks || [];
			groups[val].tasks.push(item);
			return groups;
		}, {});
		return Object.keys(results).map((item) => results[item]);
	}

	deleteAllSelectedTasks() {
		if (this.selectedTasks.length) {
			this.TaskDataService.deleteSelectedTasks(this.selectedTasks);
			this.selectedTasks = [];
		}
	}

	doneAllTasks() {
		if (this.selectedTasks.length) {
			this.TaskDataService.changeTodoTaskState(this.selectedTasks, TaskState.done);
			this.selectedTasks = [];
		}
	}

	getLastDayOfWeekDate() {
		const date = new Date();
		const today = date.getDate();
		const dayOfTheWeek = date.getDay();
		const newDate = date.setDate(today - dayOfTheWeek + 6);
		return this.datePipe.transform(new Date(newDate), this.dateFormat);
	}

	getFirstDayOfWeekDate() {
		const date = new Date();
		const today = date.getDate();
		const dayOfTheWeek = date.getDay();
		const newDate = date.setDate(today - (dayOfTheWeek || 6));
		return this.datePipe.transform(new Date(newDate), this.dateFormat);
	}
}
