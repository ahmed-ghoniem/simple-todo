import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'filterTitle'
})
export class FilterTitlePipe implements PipeTransform {
	transform(items: any[], filter: string): any {
		if (!items || !filter) {
			return items;
		}
		return items.filter((item) => item.title.indexOf(filter) !== -1);
	}
}
@Pipe({
	name: 'filterDeleted'
})
export class DeletedPipe implements PipeTransform {
	transform(items: any[], isDeleted?: Boolean): any {
		if (!items || isDeleted == null) {
			return items;
		}
		return items.filter((item) => item.isDeleted == isDeleted);
	}
}

@Pipe({
	name: 'filterState'
})
export class StatePipe implements PipeTransform {
	transform(items: any[], state?: Boolean): any {
		if (!items || state == null) {
			return items;
		}
		return items.filter((item) => item.state == state);
	}
}
