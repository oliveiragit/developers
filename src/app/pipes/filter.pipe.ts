import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'filter',
})
@Injectable()
export class FilterPipe implements PipeTransform {
  transform(items: any[], field: string, value: string | boolean): any[] {
    if (!items) {
      return [];
    }

    if (!field || !value) {
      return items;
    }
    if (typeof value === 'string') {
      const stringValue: string = value;
      return items.filter((singleItem) =>
        singleItem[field].toLowerCase().includes(stringValue.toLowerCase())
      );
    }
    else{
      return items.filter((singleItem) =>
      singleItem[field]
    );
    }
  }
}
