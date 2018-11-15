import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filterStatus'
})
export class FilterPipeStatus implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;
        searchText = searchText.toLowerCase();
        return items.filter(item => {
                return item.status.toLowerCase().includes(searchText);
        });
    }
}