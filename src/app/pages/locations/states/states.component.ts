import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Column } from 'src/app/shared/components/data-table/interfaces/table';
import { State } from 'src/app/shared/interfaces/ubication';
import { environment } from 'src/environments/environment';
import { LocationService } from "../services/location.service";
import { map, take } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { ResponsePaginate } from 'src/app/shared/interfaces/response';


@Component({
  selector: 'mvd-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.scss']
})
export class StatesComponent implements OnInit, OnDestroy {

  // displayedColumns: string[] = ['code', 'title', 'user_owner.name', 'address', 'neighborhood.name'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ////COLUMNAS TABLA
  public columns: Column[] = [
    { title: 'id', col: 'id' },
    { title: 'Nombre', col: 'name' },
    { title: 'Coordenadas', col: 'code' },
    { title: 'País ', col: 'country' },
  ]

  dataSource: Observable<any>;


  ////paginator
  totalResut: Observable<number>;
  pageDefault = 1;
  perPage: number = 10;
  orden: string = 'desc';
  filter: string = '';
  result: Observable<ResponsePaginate> = null;
  subcription: Subscription;
  
  paginatorChange(e: PageEvent) {
    console.log(e);
    this.getStates(e.pageIndex + 1, e.pageSize)

  }
  /////////////


  constructor(
    private locationService: LocationService,
  ) {   
    this.result = this.locationService.resultItems$
  }
  
  
  ngOnInit(): void {
    this.getStates(this.pageDefault, this.perPage, this.filter, this.orden)

  }

  loadData(){
    
    this.dataSource = this.result.pipe(map(v => {
      const dataTable = v?.data?.data.map(x => {
        return {
          id: x.id,
          code: x.code,
          name: x.name,
          country: x.country.name,
        }
      })
      return dataTable;
    }))

    this.totalResut = this.result.pipe(map(v => v?.data?.total))
  }



  getStates(currentPage?, perPage?, filter?, sort?) {
    const crudClient = "states"
    this.subcription = this.locationService.getItems(currentPage, perPage, filter, sort, crudClient).subscribe(next => this.loadData())
  }


  search(filter) {
    this.getStates(this.pageDefault, this.perPage, filter, this.orden)
  }

  openDialog(elementEdit?) {
    this.locationService.openDialog('states',elementEdit)
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
    const crudClient = "states"
    return this.locationService.deleteLocation(id,crudClient)
  }
   
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subcription.unsubscribe()
  }



}
