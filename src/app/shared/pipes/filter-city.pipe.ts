import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCity'
})
export class FilterCityPipe implements PipeTransform {

  transform(items:Array<any>, id?) {
    console.log(items);
    
    if(id){
      return items?.filter(item => item.province_id == id);
    } 
    return items;  
  }


}
