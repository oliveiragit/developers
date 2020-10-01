import { isNgTemplate } from '@angular/compiler';
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
    //if string field of array and value
    if (typeof value === 'string') {
      const newValue: string = removeSpecialChar(value);

      return items
        .filter((singleItem) => {
          const singleField = removeSpecialChar(singleItem[field]);
          return singleField.includes(newValue);
        })
        .sort((a, b) => {
          const itemA = removeSpecialChar(a[field]);
          const itemB = removeSpecialChar(b[field]);

          return itemA.indexOf(value) - itemB.indexOf(value);
        });
    }
    //if boolean field of array
    else {
      return items.filter((singleItem) => singleItem[field]);
    }

    function removeSpecialChar(text: string) {
      return text
        .normalize('NFD')
        .replace(/[^a-zA-Zs]/g, '')
        .toLowerCase();
    }
  }
}
