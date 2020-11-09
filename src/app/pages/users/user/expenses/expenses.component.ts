import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Column } from 'src/app/shared/components/data-table/interfaces/table';
import { ResponsePaginate } from 'src/app/shared/interfaces/response';
import { UserService } from '../../services/user.service';
import { ExpensesService } from "src/app/shared/services/expenses/expenses.service";
import { ExpensesPropertiesUsers } from 'src/app/shared/interfaces/expense';
import { User } from '../../interfaces/user';
import { MatDialog } from '@angular/material/dialog';
import { ModalReutilComponent } from 'src/app/shared/components/modals/modal-reutil/modal-reutil.component';
import { Validators } from '@angular/forms';
import { CurrencyService } from 'src/app/pages/currencies/services/currency.service';
import { Currency } from 'src/app/pages/currencies/interfaces/currency';
import { OptionSelect } from 'src/app/shared/components/dinamic-form/interfaces/fields';


@Component({
  selector: 'mvd-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  itemEdit: Observable<User>;
  userEdit: User;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    ////COLUMNAS TABLA
    public columns: Column[] = [
      { title: 'ID', col: 'id' },
      { title: 'Fecha', col: 'created_at', pipe: "dd/MM/yyyy" },
      { title: 'Tipo de Gasto', col: 'expense_name' },
      { title: 'Propiedad', col: 'property' },
      { title: 'Valor', col: 'value_currency' },

    ]

  dataSource:Observable<any[]>;
  

  ////paginator
  totalResut: Observable<number>;
  pageDefault = 1;
  perPage: number = 10;
  orden: string = 'desc';
  filter: string = '';
  result: Observable<ResponsePaginate>;
  subscroptions: Subscription[] = [];
  title: string;
  // expenses: Observable<ExpensesPropertiesUsers>[];
  optionsTypesExpense: any;
  currencies: OptionSelect[];

  paginatorChange(e: PageEvent) {
    console.log(e);
    this.getExpensesUser(e.pageIndex + 1, e.pageSize)

  }
  /////////////


  constructor(
    private userService: UserService,
    private router: Router,
    private expenseService: ExpensesService,
    public dialog: MatDialog,
    public currencyService: CurrencyService


  ) {

    this.result = this.expenseService.resultItems$

  }
  
  
  ngOnInit(): void {
    
    //para select
    this.expenseService.getExpenses(1,10000).pipe(map(v=> {
      
      return v.data.data.map( o => { return { name: o.name, value: o.id}})
       
    }),take(1)).subscribe(res => this.optionsTypesExpense = res)
    ////

    this.subscroptions.push(
      //suscibimos a currencies
      this.currencyService.getCurrencies()
      .pipe(map(v=> {
        return v.map(x=>{ return {name: x.symbol, value: x.id}})
      }))
      .subscribe(res=> this.currencies = res),
      //suscribimos a el usuario que esta siendo editado
      this.userService.userOnEdit.subscribe(user=> {
        this.userEdit = user
        if(this.userEdit){
          this.expenseService.setUserEdit(this.userEdit.id)
          this.getExpensesUser(this.pageDefault, this.perPage, this.filter, this.orden) 
        }
      })

    )
    
    
    const urlSegments = this.router.url.split("/");
    const segment = urlSegments[1];


      this.title = "Usuarios del Sistema";


  }





  getExpensesUser(currentPage?, perPage?, filter?, sort?) {
    this.subscroptions.push(
      this.expenseService.getExpensesUser(currentPage, perPage, filter, sort).subscribe(next => this.loadData())
    );
  }

  loadData() {

    this.dataSource = this.result.pipe(map(v => {
      
      
      const dataTable = v.data.data.map(x => {
        
        return {
          id: x.id,
          expense_id: x.expense_id,
          expense_name: x.expense.name,
          created_at: x.created_at,
          property_id: x.property_id,
          property: x.property.title,
          currency_id: x.currency_id,
          currency: x.currency.symbol,
          user_id: x.user_id,
          value: x.value,
          value_currency: `${x.currency.symbol} ${x.value}`
        }
      })
      return dataTable;
    }))

    this.totalResut = this.result.pipe(map(v => v.data.total))
  }

  search(filter){
    this.getExpensesUser(this.pageDefault, this.perPage, filter, this.orden)
  }

  deleteItem(id):Observable<any>{
    return this.expenseService.deleteExpenseUser(id)
  }

  itemAction(event){
    console.log(event);
    
    if(event.action === "delete"){
      this.deleteItem(event.element.id).pipe(take(1)).subscribe( res=> console.log(res))
    }
  
    if (event.action === "edit") {
      
      this.openDialog(event.element)
    }
    
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
            this.updateExpenseUser(result)
            console.log(result);
            
          }else{
            console.log(result);
            this.storeExpenseUser(result)
          }
  
        }
        
      });
    }

    updateExpenseUser(data){
      this.expenseService.updateExpensePrpertyUser(data).pipe(take(1)).subscribe()
    }


    storeExpenseUser(data){
      this.expenseService.storeExpensePrpertyUser(data).pipe(take(1)).subscribe()
    }

    setFields(elementEdit?) {
    console.log(elementEdit);
    
      const fields = [
        { nameControl: 'id', type: 'hidden', value: elementEdit?.id, label: 'Id' },
        { nameControl: 'user_id', type: 'hidden', value: this.userEdit.id, label: 'User ID' },
        { nameControl: 'expense_id', type: 'select', value: elementEdit?.expense_id, label: 'Tipo de Gasto',options: this.optionsTypesExpense, validators: [Validators.required] },
        { nameControl: 'property_name', type: 'autocomplete', value: elementEdit?.property, label: 'Propiedad', validators: [Validators.required]  },
        { nameControl: 'property_id', type: 'hidden', value: elementEdit?.property_id, label: '', validators: [Validators.required]  },
        { nameControl: 'currency_id', type: 'select', value: elementEdit?.currency_id, label: 'Moneda', options: this.currencies, validators: [Validators.required] },
        { nameControl: 'value', type: 'text', value: elementEdit?.value, label: 'Valor', validators: [Validators.required] },
      ]
  
      return fields
    }

    ngOnDestroy(): void {
      //Called once, before the instance is destroyed.
      //Add 'implements OnDestroy' to the class.
      this.subscroptions.map(
        v=> v.unsubscribe()
      )
    }

}
