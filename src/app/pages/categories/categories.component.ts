import { Component, OnInit, ViewChild } from '@angular/core';

import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalReutilComponent } from 'src/app/shared/components/modals/modal-reutil/modal-reutil.component';

import { ResponsePaginate } from 'src/app/shared/interfaces/response';
import { Column } from 'src/app/shared/components/data-table/interfaces/table';
import { Category } from "./interfaces/category";

import { CategoriesService } from "./services/categories.service";

import { Observable, Subscription, pipe } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Fields, OptionSelect } from 'src/app/shared/components/dinamic-form/interfaces/fields';
import { StatusService } from 'src/app/shared/services/status/status.service';
import { Status } from 'src/app/shared/interfaces/status';
import { Validators } from '@angular/forms';

@Component({
  selector: 'mvd-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ////COLUMNAS TABLA
  public columns: Column[] = [
    { title: 'ID', col: 'id' },
    { title: 'Nombre', col: 'name' },
    { title: 'Descripción', col: 'description' },
    { title: 'Estado', col: 'status' },

  ]

  dataSource: Observable<any[]>;

  ////paginator
  totalResut: Observable<number>;
  pageDefault = 1;
  perPage: number = 10;
  orden: string = 'desc';
  filter: string = '';
  result: Observable<ResponsePaginate>;
  subscroption: Subscription;
  statuses: OptionSelect[];

  fields: Fields[]

  /////////////


  constructor(
    private categoriesService: CategoriesService,
    public dialog: MatDialog,
    private statusService: StatusService
  ) {
    this.result = this.categoriesService.resultItems$

  }


  ngOnInit(): void {
    this.getCategories(this.pageDefault, this.perPage, this.filter, this.orden)


    this.getStatus()

  }

  paginatorChange(e: PageEvent) {
    console.log(e);
    this.getCategories(e.pageIndex + 1, e.pageSize)

  }



  getCategories(currentPage?, perPage?, filter?, sort?) {
    this.subscroption = this.categoriesService.getCategories(currentPage, perPage, filter, sort).subscribe(next => this.loadData());
  }

  loadData() {

    this.dataSource = this.result.pipe(map(v => {
      const dataTable = v.data.data.map(x => {
        return {
          id: x.id,
          name: x.name,
          description: x.description,
          status_id: x.status_id,
          status: x.status.name

        }
      })
      return dataTable;
    }))

    this.totalResut = this.result.pipe(map(v => v.data.total))
  }

  search(filter) {
    this.getCategories(this.pageDefault, this.perPage, filter, this.orden)
  }

  deleteItem(id): Observable<any> {
    return this.categoriesService.deleteCategory(id)
  }

  itemAction(event) {
    console.log(event);

    if (event.action === "delete") {
      this.deleteItem(event.element.id).pipe(take(1)).subscribe(res => console.log(res))
    }

    if (event.action === "edit") {
      
      this.openDialog(event.element)
    }

  }



  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscroption.unsubscribe()
  }

  add(){
    
  }

  openDialog(data?) {
    
    const dialogRef = this.dialog.open(ModalReutilComponent, {
      width: '850px',
      data: this.setFields(data)
    });

    return dialogRef.afterClosed().subscribe(result => {
      // this.animal = result;
      if(result){
        if (result.id) {
          this.updateCategory(result)
          
        }else{
          this.storeCategory(result)
        }

      }
      
    });
  }


  setFields(elementEdit? : Category) {
    
    const fields = [
      { nameControl: 'id', type: 'hidden', value: elementEdit?.id, label: 'Id' },
      { nameControl: 'name', type: 'text', value: elementEdit?.name, label: 'Nombre', validators: [Validators.required] },
      { nameControl: 'description', type: 'text', value: elementEdit?.description, label: 'Descripción' },
      { nameControl: 'status_id', type: 'select', value: elementEdit?.status_id, label: 'Estado', options: this.statuses, validators: [Validators.required] },
    ]

    return fields
  }


  getStatus(){
    this.statusService.getStatus("ALL").pipe(map(v=> {
      return v.map( o => { return { name: o.name, value: o.id}})
       
    }),take(1)).subscribe(res => this.statuses = res)

 
  }

  storeCategory(data){
    this.categoriesService.storeCategory(data).pipe(take(1)).subscribe(
      res=> {
        console.log(res);
      }
    )
  }

  updateCategory(data){
    this.categoriesService.updateCategory(data).pipe(take(1)).subscribe(
      res=> {
        console.log(res);        
      }
    )
  }


}
