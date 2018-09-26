import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filterBusinessCategory'
})
export class FilterPipeBusinessCategory implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;
        searchText = searchText.toLowerCase();
        return items.filter(item => {
            if (item.businessCategoryName.toLowerCase().includes(searchText)) {
                return item.businessCategoryName.toLowerCase().includes(searchText);
            }
            else {
                return item.businessCategoryCode.toLowerCase().includes(searchText);
            }
        });
    }
}