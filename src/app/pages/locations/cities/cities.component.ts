import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Column } from 'src/app/shared/components/data-table/interfaces/table';
import { State, City } from 'src/app/shared/interfaces/ubication';
import { LocationService } from '../services/location.service';
import { Observable, Subscription } from 'rxjs';
import { ResponsePaginate } from 'src/app/shared/interfaces/response';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'mvd-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {

  // displayedColumns: string[] = ['code', 'title', 'user_owner.name', 'address', 'neighborhood.name'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ////COLUMNAS TABLA
  public columns: Column[] = [
    { title: 'id', col: 'id' },
    { title: 'Nombre', col: 'name' },
    { title: 'Coordenadas', col: 'code' },
    { title: 'Provincia ', col: 'state' },
  ]

  dataSource: Observable<any>;
  result: Observable<ResponsePaginate>;
  totalResut: Observable<number>;
  cities: City[];

  ////paginator
  pageDefault = 1;
  perPage: number = 10;
  orden: string = 'desc';
  filter: string = '';
  subcription: Subscription;

  paginatorChange(e: PageEvent) {
    console.log(e);
    this.getCities(e.pageIndex + 1, e.pageSize)

  }
  /////////////


  constructor(
    private locationService: LocationService
  ) {
    this.result = this.locationService.resultItems$

  }


  ngOnInit(): void {

    this.getCities(this.pageDefault, this.perPage, this.filter, this.orden)

  }


  getCities(currentPage?, perPage?, filter?, sort?) {
    const crudClient = "cities"
    this.subcription = this.locationService.getItems(currentPage, perPage, filter, sort, crudClient).subscribe(next => this.loadData())
  }

  loadData() {
    this.dataSource = this.result.pipe(map(v => {
      const dataTable = v.data.data.map(x => {
        return {
          id: x.id,
          code: x.code,
          name: x.name,
          state: x.province.name,
          state_id: x.province.id
        }
      })
      return dataTable;
    }))

    this.totalResut = this.result.pipe(map(v => v.data.total))
  }

  search(filter) {
    this.getCities(this.pageDefault, this.perPage, filter, this.orden)
  }

  openDialog(elementEdit?){
    this.locationService.openDialog('cities',elementEdit)
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
    const crudClient = "cities"
    return this.locationService.deleteLocation(id,crudClient)
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subcription.unsubscribe()
  }
}
