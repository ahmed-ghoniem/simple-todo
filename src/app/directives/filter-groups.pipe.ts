import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'filterGroups'
})
export class FilterGroupsPipe implements PipeTransform {
	transform(items: any[], filter: any[]): any {
		if (!items || (filter || []).length == 0) {
			return items;
		}
		return items.filter((item) => filter.indexOf(item.groupId) !== -1);
	}
}
