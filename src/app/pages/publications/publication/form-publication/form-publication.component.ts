import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Currency } from 'src/app/pages/currencies/interfaces/currency';
import { CurrencyService } from 'src/app/pages/currencies/services/currency.service';
import { Product } from 'src/app/pages/products/interfaces/product';
import { TransactionType } from 'src/app/pages/transaction-types/interfaces/transaction-type';
import { TransactionTypesService } from 'src/app/pages/transaction-types/services/transaction-types.service';
import { Status } from 'src/app/shared/interfaces/status';
import { StatusService } from 'src/app/shared/services/status/status.service';
import { Publication } from '../../interfaces/publication';
import { PublicationsService } from '../../services/publications.service';

@Component({
  selector: 'mvd-form-publication',
  templateUrl: './form-publication.component.html',
  styleUrls: ['./form-publication.component.scss']
})
export class FormPublicationComponent implements OnInit, OnDestroy {

  @Input() idPublication: number
  @Input() idProperty: number = null
  @Input() titlePropety: string = null

  publicationEdit: Publication;
  edit: boolean = false;
  form: FormGroup
  subcriptions: Subscription[]=[];
  statuses: Observable<Status[]>;
  transactionsTipes: Observable<TransactionType[]>;
  currencies: Observable<Currency[]>;
  pageProduct :boolean;
  urlReturn: string;

  constructor(
    private publicationService: PublicationsService,
    private transactionsTypeService: TransactionTypesService,
    private currencyService: CurrencyService,
    private statusService: StatusService,
    private fb: FormBuilder,
    private router: Router

  ) {
  }


  ngOnInit(): void {
    this.createForm()

    this.transactionsTipes = this.transactionsTypeService.getTransactionTypes().pipe(map(v => v.data.data))
    this.currencies = this.currencyService.getCurrencies()
    this.statuses = this.statusService.getStatus("PUB")
    this.pageProduct = this.isPageProduct()
    this.idPublication ? this.getPublication(this.idPublication): false
  }


  isPageProduct(){
    const requestUrl = this.router.url.split("/")
    this.urlReturn = requestUrl.slice(0,2).join("/");
    console.log(this.urlReturn);

    if(requestUrl[1] === "productos") return true;
    return false
  }




  getPublication(id){
    this.subcriptions.push(this.publicationService.getPublication(id).subscribe(
        res => {
          this.publicationEdit = res
          this.setForm()
        })
    )
  }

  createForm() {
    this.form = this.fb.group({
      property_id: [this.idProperty],
      title: [this.titlePropety],
      status_id: [null, Validators.required],
      transaction_types: this.buildTransactionTypes()

    })
    console.log(this.form.value);
  }

  setForm() {
    if (this.publicationEdit) {
      this.form.patchValue({
        property_id: this.publicationEdit?.property_id,
        title: this.publicationEdit?.property.title,
        status_id: this.publicationEdit?.status_id,
      })
      this.buildTransactionTypes()
      // console.log(this.form.value);

    }

  }

  buildTransactionTypes() {
    // v => {
    //   return { 'transaction_type_id': v.id, 'currency_id': v.pivot.currency.id, }
    // })
    if (this.publicationEdit) {
      const value = this.publicationEdit.transaction_types.map(
        (v, i) => {
          this.addFormControlTransaction(v)
          return
        }
      )


    }else{
      return this.fb.array([])    }
  }


  addFormControlTransaction(edit?) {
    const transactions = this.form.get('transaction_types') as FormArray;

    const newTransaction = this.fb.group({
      "transaction_type_id": [edit?.id, Validators.required],
      "currency_id": [edit?.pivot.currency.id, Validators.required],
      "price": [edit?.pivot.price, Validators.required]
    })
    // transactions.patchValue([newTransaction])
    transactions.push(newTransaction)

  }

  dataSubmit() {
    console.log(this.form.value);

    const data = this.form.value
    if (this.publicationEdit) {

      if (data.transaction_types.length >= 1) {
        this.updatePublication(data)

      } else {
        this.deletePublication(this.publicationEdit.id)
      }
    } else {


      this.addPublication(data)

    }


  }

  addPublication(data) {
    this.publicationService.storePublication(data).pipe(take(1)).subscribe(
      res => {
        console.log(res);
        this.router.navigate([this.urlReturn])
        // this.publicationService.setPublicationOnEdit(res)
      }
    )
  }


  removeTransaction(index){
    const transactions = this.form.get('transaction_types') as FormArray;
    transactions.removeAt(index)
  }

  updatePublication(data) {
    this.publicationService.updatePublication(data).pipe(take(1)).subscribe(
      res => {
        console.log(res);
        this.router.navigate([this.urlReturn])
      }
    )
  }

  deletePublication(id){
    this.subcriptions.push(this.publicationService.deletePublication(id).subscribe(res=> this.router.navigate([this.urlReturn])))
  }


  ngOnDestroy() {
    this.subcriptions.map(v=>v.unsubscribe())
  }

}
