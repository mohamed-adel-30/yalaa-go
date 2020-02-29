import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitTo'
})
export class LimitToPipe implements PipeTransform {

  transform(value: any, limit: number): any {


    return value.length > limit ? value.slice(0, limit): value;
  }

}
