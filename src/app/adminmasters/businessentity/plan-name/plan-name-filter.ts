import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filterPlanName'
})
export class FilterPipePlanName implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;
        searchText = searchText.toLowerCase();
        return items.filter(item => {
                return item.planName.toLowerCase().includes(searchText);
        });
    }
}