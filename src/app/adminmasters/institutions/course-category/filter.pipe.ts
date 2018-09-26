import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filterCourseCategory'
})
export class FilterPipeCourseCategory implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;
        searchText = searchText.toLowerCase();
        return items.filter(item => {
            if (item.categoryName.toLowerCase().includes(searchText)) {
                return item.categoryName.toLowerCase().includes(searchText);
            }
            else {
                return item.categoryCode.toLowerCase().includes(searchText);
            }
        });
    }
}