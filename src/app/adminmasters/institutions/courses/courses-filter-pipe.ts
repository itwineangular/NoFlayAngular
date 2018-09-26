import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filterCourses'
})
export class FilterPipeCourses implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;
        searchText = searchText.toLowerCase();
        return items.filter(item => {
            if (item.courseName.toLowerCase().includes(searchText)) {
                return item.courseName.toLowerCase().includes(searchText);
            }
            else if (item.courseCode.toLowerCase().includes(searchText)) {
                return item.courseCode.toLowerCase().includes(searchText);
            }
            else if (item.categoryName.toLowerCase().includes(searchText)) {
                return item.categoryName.toLowerCase().includes(searchText);
            }
            else {
                return item.duration.toLowerCase().includes(searchText);
            }
        });
    }
}