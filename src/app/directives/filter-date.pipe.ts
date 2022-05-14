import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'filterDate'
})
export class FilterDatePipe implements PipeTransform {
	transform(items: any[], filter: any, filter2: any = null): any {
		if (!items || !filter) {
			return items;
		}
		// range filter
		if (filter && filter2) {
			var dateFrom = this.toDateTime(filter);
			var dateTo = this.toDateTime(filter2);
			return items.filter(
				(item) => this.toDateTime(item.date) >= dateFrom && this.toDateTime(item.date) <= dateTo
			);
		}
		return items.filter((item) => item.date.indexOf(filter) !== -1);
	}

	toDateTime(dateString) {
		// expected date in format 'yyyy-MM-dd'
		var splittedDate = dateString.split('-');
		return new Date(splittedDate[0], parseInt(splittedDate[1]) - 1, splittedDate[2]);
	}
}
