import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Column } from 'src/app/shared/components/data-table/interfaces/table';
import { City } from '../../products/interfaces/product';
import { LocationService } from '../services/location.service';
import { Municipality } from 'src/app/shared/interfaces/ubication';
import { Observable, Subscription } from 'rxjs';
import { ResponsePaginate } from 'src/app/shared/interfaces/response';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'mvd-municipalities',
  templateUrl: './municipalities.component.html',
  styleUrls: ['./municipalities.component.scss']
})
export class MunicipalitiesComponent implements OnInit {
  // displayedColumns: string[] = ['code', 'title', 'user_owner.name', 'address', 'neighborhood.name'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ////COLUMNAS TABLA
  public columns: Column[] = [
    { title: 'id', col: 'id' },
    { title: 'Nombre', col: 'name' },
    { title: 'Coordenadas', col: 'code' },
    { title: 'Ciudad ', col: 'city' },
  ]


  dataSource: Observable<any>;
  result: Observable<ResponsePaginate>;
  totalResut: Observable<number>;
  
  cities: Municipality[];

  ////paginator
  pageDefault = 1;
  perPage: number = 10;
  orden: string = 'desc';
  filter: string = '';
  subcription: Subscription;

  paginatorChange(e: PageEvent) {
    console.log(e);
    this.getMunicipality(e.pageIndex + 1, e.pageSize)

  }
  /////////////


  constructor(
    private locationService: LocationService
  ) {
    this.result = this.locationService.resultItems$

  }


  ngOnInit(): void {

    this.getMunicipality(this.pageDefault, this.perPage, this.filter, this.orden)

  }






  getMunicipality(currentPage?, perPage?, filter?, sort?) {
    const crudClient = "municipalities"
    this.subcription = this.locationService.getItems(currentPage, perPage, filter, sort, crudClient).subscribe(next => this.loadData())
  }

  loadData(){
    
    this.dataSource = this.result.pipe(map(v => {
      const dataTable = v.data.data.map(x => {
        return {
          id: x.id,
          code: x.code,
          name: x.name,
          city: x.city.name,
          city_id: x.city.id,
          state_id: x.city.province.id,

        }
      })
      return dataTable;
    }))

    this.totalResut = this.result.pipe(map(v => v.data.total))
  }

  search(filter) {
    this.getMunicipality(this.pageDefault, this.perPage, filter, this.orden)
  }

  openDialog(elementEdit?){
    this.locationService.openDialog('municipalities',elementEdit)
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
    const crudClient = "municipalities"
    return this.locationService.deleteLocation(id,crudClient)
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subcription.unsubscribe()
  }
}
