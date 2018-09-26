import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filterAttribute'
})
export class FilterPipeAttribute implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;
        searchText = searchText.toLowerCase();
        return items.filter(item => {
            if (item.attributeName.toLowerCase().includes(searchText)) {
                return item.attributeName.toLowerCase().includes(searchText);
            }
            else if (item.attributeCode.toLowerCase().includes(searchText)) {
                return item.attributeCode.toLowerCase().includes(searchText);
            }
            else {
                return item.businessCatCode.toLowerCase().includes(searchText);
            }
        });
    }
}