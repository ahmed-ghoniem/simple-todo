import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilterType } from 'src/app/models/filter-type.enum';
import { TaskDataService } from 'src/app/services/task-data.service';

@Component({
	selector: 'app-side-menu',
	templateUrl: './side-menu.component.html',
	styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
	groups = [];
	filterType = FilterType;
	constructor(private _router: Router, private taskDataService: TaskDataService) {}

	ngOnInit(): void {
		this.groups = this.taskDataService.allGroups;
	}

	setFilter(filterType: FilterType = null, group = null) {
		if (!filterType) {
			this._router.navigate(['/']);
		} else {
			this._router.navigate(['/'], {
				queryParams: {
					type: filterType,
					group: group
				}
			});
		}
	}
}
