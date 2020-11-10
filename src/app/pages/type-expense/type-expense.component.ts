import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Column } from 'src/app/shared/components/data-table/interfaces/table';
import { Fields, OptionSelect } from 'src/app/shared/components/dinamic-form/interfaces/fields';
import { ModalReutilComponent } from 'src/app/shared/components/modals/modal-reutil/modal-reutil.component';
import { Expense } from 'src/app/shared/interfaces/expense';
import { ResponsePaginate } from 'src/app/shared/interfaces/response';
import { ExpensesService } from 'src/app/shared/services/expenses/expenses.service';
import { StatusService } from 'src/app/shared/services/status/status.service';

@Component({
  selector: 'mvd-type-expense',
  templateUrl: './type-expense.component.html',
  styleUrls: ['./type-expense.component.scss']
})
export class TypeExpenseComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ////COLUMNAS TABLA
  public columns: Column[] = [
    { title: 'ID', col: 'id' },
    { title: 'Nombre', col: 'name' },
    { title: 'Descripción', col: 'description' },

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
    private expensesService: ExpensesService,
    public dialog: MatDialog,
    private statusService: StatusService
  ) {
    this.result = this.expensesService.resultItems$

  }


  ngOnInit(): void {
    this.getExpenses(this.pageDefault, this.perPage, this.filter, this.orden)

  }

  paginatorChange(e: PageEvent) {
    console.log(e);
    this.getExpenses(e.pageIndex + 1, e.pageSize)

  }



  getExpenses(currentPage?, perPage?, filter?, sort?) {
    this.subscroption = this.expensesService.getExpenses(currentPage, perPage, filter, sort).subscribe(next => this.loadData());
  }

  loadData() {

    this.dataSource = this.result.pipe(map(v => {
      const dataTable = v.data.data.map(x => {
        return {
          id: x.id,
          name: x.name,
          description: x.description

        }
      })
      return dataTable;
    }))

    this.totalResut = this.result.pipe(map(v => v.data.total))
  }

  search(filter) {
    this.getExpenses(this.pageDefault, this.perPage, filter, this.orden)
  }

  deleteItem(id): Observable<any> {
    return this.expensesService.deleteExpense(id)
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
          this.updateExpense(result)
          
        }else{
          this.storeExpense(result)
        }

      }
      
    });
  }


  setFields(elementEdit? : Expense) {
    
    const fields = [
      { nameControl: 'id', type: 'hidden', value: elementEdit?.id, label: 'Id' },
      { nameControl: 'name', type: 'text', value: elementEdit?.name, label: 'Nombre', validators: [Validators.required] },
      { nameControl: 'description', type: 'text', value: elementEdit?.description, label: 'Descripción' },
    ]

    return fields
  }

  storeExpense(data){
    this.expensesService.storeExpense(data).pipe(take(1)).subscribe(
      res=> {
        console.log(res);
      }
    )
  }

  updateExpense(data){
    this.expensesService.updateExpense(data).pipe(take(1)).subscribe(
      res=> {
        console.log(res);        
      }
    )
  }
}
