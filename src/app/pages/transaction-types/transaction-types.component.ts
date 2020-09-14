import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { Column } from 'src/app/shared/components/data-table/interfaces/table';
import { Fields, OptionSelect } from 'src/app/shared/components/dinamic-form/interfaces/fields';
import { ModalReutilComponent } from 'src/app/shared/components/modals/modal-reutil/modal-reutil.component';
import { StatusService } from 'src/app/shared/services/status/status.service';
import { TransactionTypesService } from "./services/transaction-types.service";
import { TransactionType } from "./interfaces/transaction-type";

import { Observable, Subscription } from 'rxjs';
import { map, take, filter } from 'rxjs/operators';
import { ResponsePaginate } from 'src/app/shared/interfaces/response';

@Component({
  selector: 'mvd-transaction-types',
  templateUrl: './transaction-types.component.html',
  styleUrls: ['./transaction-types.component.scss']
})
export class TransactionTypesComponent implements OnInit {

 
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ////COLUMNAS TABLA
  public columns: Column[] = [
    { title: 'ID', col: 'id' },
    { title: 'Nombre', col: 'name' },


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

  fields: Fields[]

  /////////////


  constructor(
    private transactionTypesService: TransactionTypesService,
    public dialog: MatDialog,
    private statusSetvice: StatusService
  ) {
    this.result = this.transactionTypesService.resultItems$

  }


  ngOnInit(): void {
    this.getTransactionTypes(this.pageDefault, this.perPage, this.filter, this.orden)
  }

  paginatorChange(e: PageEvent) {
    console.log(e);
    this.getTransactionTypes(e.pageIndex + 1, e.pageSize)

  }



  getTransactionTypes(currentPage?, perPage?, filter?, sort?) {
    this.subscroption = this.transactionTypesService.getTransactionTypes(currentPage, perPage, filter, sort).subscribe(next => this.loadData());
  }

  loadData() {

    this.dataSource = this.result.pipe(map(v => {
      const dataTable = v.data.data.map(x => {
        return {
          id: x.id,
          name: x.name,

        }
      })
      return dataTable;
    }))

    this.totalResut = this.result.pipe(map(v => v.data.total))
  }

  search(filter) {
    this.getTransactionTypes(this.pageDefault, this.perPage, filter, this.orden)
  }

  deleteItem(id): Observable<any> {
    return this.transactionTypesService.deleteTransactionType(id)
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
      width: '550px',
      data: this.setFields(data)
    });

    return dialogRef.afterClosed().subscribe(result => {
      // this.animal = result;
      if(result){
        if (result.id) {
          this.updateTransactionType(result)
          
        }else{
          this.storeTransactionType(result)
        }

      }
      
    });
  }


  setFields(elementEdit? : TransactionType) {
    
    const fields = [
      { nameControl: 'id', type: 'hidden', value: elementEdit?.id, label: 'Id' },
      { nameControl: 'name', type: 'text', value: elementEdit?.name, label: 'Nombre', validators: [Validators.required] },
    ]

    return fields
  }

  storeTransactionType(data){
    this.transactionTypesService.storeTransactionType(data).pipe(take(1)).subscribe(
      res=> {
        console.log(res);
      }
    )
  }

  updateTransactionType(data){
    this.transactionTypesService.updateTransactionType(data).pipe(take(1)).subscribe(
      res=> {
        console.log(res);        
      }
    )
  }



}
