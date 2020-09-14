import { Component, OnInit, ViewChild } from '@angular/core';
import { Neighborhood } from 'src/app/shared/interfaces/ubication';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Column } from 'src/app/shared/components/data-table/interfaces/table';
import { LocationService } from '../services/location.service';
import { map, take } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { ResponsePaginate } from 'src/app/shared/interfaces/response';

@Component({
  selector: 'mvd-neighborhoods',
  templateUrl: './neighborhoods.component.html',
  styleUrls: ['./neighborhoods.component.scss']
})
export class NeighborhoodsComponent implements OnInit {

 // displayedColumns: string[] = ['code', 'title', 'user_owner.name', 'address', 'neighborhood.name'];

 @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
 ////COLUMNAS TABLA
 public columns: Column[] = [
   { title: 'id', col: 'id' },
   { title: 'Nombre', col: 'name' },
   { title: 'Coordenadas', col: 'code' },
   { title: 'Municipalidad ', col: 'municipality' },
 ]

dataSource: Observable<any>;
result: Observable<ResponsePaginate>;
neighborhoods: Neighborhood[];
subcription: Subscription;


////paginator
  totalResut:  Observable<number>;
  pageDefault = 1;
  perPage: number = 10;
  orden: string = 'desc';
  filter: string = '';

paginatorChange(e: PageEvent) {
 console.log(e);
 this.getNeighborhoods(e.pageIndex + 1, e.pageSize)

}
/////////////


constructor(
 private locationService: LocationService
) {
  this.result = this.locationService.resultItems$

}


ngOnInit(): void {

 this.getNeighborhoods(this.pageDefault, this.perPage, this.filter, this.orden)

}





getNeighborhoods(currentPage?, perPage?, filter?, sort?) {
 const crudClient = "neighborhoods"
 this.subcription = this.locationService.getItems(currentPage, perPage, filter, sort, crudClient).subscribe(next => this.loadData())
}

loadData(){
  
 this.dataSource = this.result.pipe(map(v => {
  const dataTable = v.data.data.map(x => {
    return {
     id: x.id,
     code: x.code,
     name: x.name,
     municipality: x.municipality.name,
     municipality_id: x.municipality.id,
     city_id: x.municipality.city.id,
     state_id: x.municipality.city.province.id,
    }
  })
  return dataTable;
}))

this.totalResut = this.result.pipe(map(v => v.data.total))
}

search(filter){
 this.getNeighborhoods(this.pageDefault, this.perPage, filter, this.orden)
}


openDialog(elementEdit?){
  this.locationService.openDialog('neighborhoods',elementEdit)
}

itemAction(event){
  if(event.action === "delete"){
    this.deleteItem(event.element.id).pipe(take(1)).subscribe( res=> console.log(res))
  }

  if(event.action === "edit"){
    this.openDialog(event.element)
  }
}

deleteItem(id):Observable<any>{
  const crudClient = "neighborhoods"
  return this.locationService.deleteLocation(id,crudClient)
}

ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  this.subcription.unsubscribe()
}
}
