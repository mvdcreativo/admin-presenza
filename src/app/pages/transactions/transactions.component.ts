import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Column } from 'src/app/shared/components/data-table/interfaces/table';
import { Fields, OptionSelect } from 'src/app/shared/components/dinamic-form/interfaces/fields';
import { ModalReutilComponent } from 'src/app/shared/components/modals/modal-reutil/modal-reutil.component';
import { ResponsePaginate } from 'src/app/shared/interfaces/response';
import { Currency } from '../currencies/interfaces/currency';
import { CurrencyService } from '../currencies/services/currency.service';
import { ProductService } from '../products/services/product.service';
import { TransactionType } from '../transaction-types/interfaces/transaction-type';
import { TransactionTypesService } from '../transaction-types/services/transaction-types.service';
import { User } from '../users/interfaces/user';
import { UserService } from '../users/services/user.service';
import { Transaction } from './interfaces/transaction';
import { TransactionService } from "./services/transaction.service";

@Component({
  selector: 'mvd-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ////COLUMNAS TABLA
  public columns: Column[] = [
    { title: 'ID', col: 'id' },
    { title: 'Fecha', col: 'created_at', pipe: 'd/MM/yyy' },
    { title: 'Tipo de transacción', col: 'transaction_type_name' },
    { title: 'Comprador/Inquilino', col: 'user_customer_name' },
    { title: 'Inicio', col: 'date_ini', pipe: 'd/MM/yyy' },
    { title: 'Vencimiento', col: 'date_end', pipe: 'd/MM/yyy' },

  ]

  dataSource: Observable<any[]>;

  ////paginator
  totalResut: Observable<number>;
  pageDefault = 1;
  perPage: number = 10;
  orden: string = 'desc';
  filter: string = '';
  result: Observable<ResponsePaginate>;
  subscroption: Subscription[]=[];
  propertiesSelect: OptionSelect[];

  fields: Fields[]
  transactionsTipes_select: OptionSelect[];
  currencies_select: OptionSelect[];
  owners_select: OptionSelect[];
  customer_select: OptionSelect[];

  /////////////


  constructor(
    private transactionsService: TransactionService,
    public dialog: MatDialog,
    private transactionsTypeService: TransactionTypesService,
    private currencyService: CurrencyService,
    private userServices: UserService,
    private ptoductService : ProductService
  ) {
    this.result = this.transactionsService.resultItems$

  }


  ngOnInit(): void {
    this.subscroption.push(
      this.transactionsTypeService.getTransactionTypes().pipe(map(v => v.data.data)).subscribe(res=> this.transactionsTipes_select = res.map(v=> { return {name:v.name, value: v.id}})),
      this.currencyService.getCurrencies().subscribe(res => this.currencies_select = res.map(v=> { return {name:v.symbol, value: v.id}})),
      this.userServices.getUsers( 1 , 100000, '', null).pipe(map(v=> v.data.data )).subscribe(
        res=> {
          console.log(res);
          
          this.customer_select = res.map(v=> { return {name:v.name, value: v.id}})
          this.owners_select = res.filter(x=> x.properties_owner.length >= 1).map(v=> { return {name:v.name, value: v.id}})
        })
    )

    this.getTransactions(this.pageDefault, this.perPage, this.filter, this.orden)

  }

  paginatorChange(e: PageEvent) {
    console.log(e);
    this.getTransactions(e.pageIndex + 1, e.pageSize)

  }



  getTransactions(currentPage?, perPage?, filter?, sort?) {
    this.subscroption.push(
      this.transactionsService.getTransactions(currentPage, perPage, filter, sort).subscribe(next => this.loadData())
    ) 
  }

  loadData() {

    this.dataSource = this.result.pipe(map(v => {
      const dataTable = v.data.data.map(x => {
        return {
          id: x.id,
          user_owner_id : x.user_owner_id,
          user_customer_id : x.user_customer_id,
          property_id : x.property_id,
          created_at: x.created_at,
          transaction_type_id : x.transaction_type_id,
          value : x.value,
          currency_id : x.currency_id,
          date_ini: x.date_ini,
          date_end: x.date_end,
          property: x.property,
          user_owner: x.user_owner,
          user_customer: x.user_customer,
          transaction_type: x.transaction_type,
          transaction_type_name: x.transaction_type.name,
          user_owner_name: x.user_owner.name,
          user_customer_name: x.user_customer.name,
        }
      })
      return dataTable;
    }))

    this.totalResut = this.result.pipe(map(v => v.data.total))
  }

  search(filter) {
    this.getTransactions(this.pageDefault, this.perPage, filter, this.orden)
  }

  deleteItem(id): Observable<any> {
    return this.transactionsService.deleteTransaction(id)
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
    this.subscroption.map(v=> v.unsubscribe())
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
          this.updateTransaction(result)
          
        }else{
          this.storeTransaction(result)
        }

      }
      
    });
  }


  setFields(elementEdit? : Transaction) {
    console.log(elementEdit);
    
    const fields = [
      { nameControl: 'id', type: 'hidden', value: elementEdit?.id, label: 'Id' },
      { nameControl: 'user_owner_id', type: 'select', value: elementEdit?.user_owner_id, label: 'Propietario', options: this.owners_select, validators: [Validators.required] },
      { nameControl: 'user_customer_id', type: 'select', value: elementEdit?.user_customer_id, label: 'Comprador/Arrendatario', options: this.customer_select, validators: [Validators.required] },
      { nameControl: 'property_id', type: 'select', value: elementEdit?.property_id, label: 'Propiedad', options: null, validators: [Validators.required] },
      { nameControl: 'transaction_type_id', type: 'select', value: elementEdit?.transaction_type_id, label: 'Tipo de transacción', options: this.transactionsTipes_select, validators: [Validators.required] },
      { nameControl: 'currency_id', type: 'select', value: elementEdit?.currency_id, label: 'Moneda', options: this.currencies_select, validators: [Validators.required] },
      { nameControl: 'value', type: 'number', value: elementEdit?.value, label: 'Valor', validators: [Validators.required] },
      { nameControl: 'date_ini', type: 'date', value: elementEdit?.date_ini, label: 'Fecha inicio',  validators: null },
      { nameControl: 'date_end', type: 'date', value: elementEdit?.date_end, label: 'Facha vencimiento',  validators: null },
    ]

    return fields
  }


  storeTransaction(data){
    this.transactionsService.storeTransaction(data).pipe(take(1)).subscribe(
      res=> {
        console.log(res);
      }
    )
  }

  updateTransaction(data){
    this.transactionsService.updateTransaction(data).pipe(take(1)).subscribe(
      res=> {
        console.log(res);        
      }
    )
  }
}
