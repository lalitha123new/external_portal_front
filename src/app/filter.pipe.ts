import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'filter'
})
export class FilterPipe implements PipeTransform {

	transform(value: any, args?: any): any {
		if (args != undefined && args != null && args != '') {
			return value.filter(data => ((data.pat_name.toLowerCase()).indexOf(args.toLowerCase()) > -1) || (data.hosp_ref_no.toLowerCase()).indexOf(args.toLowerCase()) > -1);
		}
		return value;
	}

}
