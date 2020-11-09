import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import {default as _rollupMoment} from 'moment';
import moment from 'moment';
@Pipe({
  name: 'dynamicPipe'
})
export class DynamicPipePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform(value: string, format: string ) {
    if(!format){
      return value;
    }else{

      // let date = new Date(parseInt(value.substr(6)));
      let date = moment(value)
      return this.datePipe.transform(date, format);

    }
  }

}
