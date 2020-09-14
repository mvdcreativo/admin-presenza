import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dynamicPipe'
})
export class DynamicPipePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform(value: string, format: string ) {
    if(!format){
      return value;
    }else{
      let date = new Date(parseInt(value.substr(6)));
      return this.datePipe.transform(date, format);

    }
  }

}
