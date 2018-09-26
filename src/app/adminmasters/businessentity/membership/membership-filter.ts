import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filterMembership'
})
export class FilterPipeMembership implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;
        searchText = searchText.toLowerCase();
        return items.filter(item => {
                return item.memberName.toLowerCase().includes(searchText);
        });
    }
}