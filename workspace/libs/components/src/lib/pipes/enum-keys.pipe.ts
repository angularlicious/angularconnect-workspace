import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumKeys',
})
export class EnumKeysPipe implements PipeTransform {
  transform(value, args: string[]): any {
    const keys = [];
    for (const enumMember in value) {
      if (enumMember) {
        keys.push({ key: enumMember, value: value[enumMember] });
      }
    }
    return keys;
  }
}
