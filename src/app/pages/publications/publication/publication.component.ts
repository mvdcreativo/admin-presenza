import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Publication } from '../interfaces/publication';
import { PublicationsService } from '../services/publications.service';
import { ActivatedRoute, Params } from '@angular/router';
import { take, map } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { StatusService } from 'src/app/shared/services/status/status.service';
import { Status } from 'src/app/shared/interfaces/status';
import { TransactionType } from '../../transaction-types/interfaces/transaction-type';
import { TransactionTypesService } from '../../transaction-types/services/transaction-types.service';
import { CurrencyService } from "../../currencies/services/currency.service";
import { Currency } from '../../currencies/interfaces/currency';

@Component({
  selector: 'mvd-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit, OnDestroy {


  // id: number = 101
  publicationEdit: Publication;
  edit: boolean = false;
  form: FormGroup
  subcriptionPubliction: Subscription
  statuses: Observable<Status[]>;
  transactionsTipes: Observable<TransactionType[]>;
  currencies: Observable<Currency[]>;

  constructor(
    private publicationService: PublicationsService,
    private transactionsTypeService: TransactionTypesService,
    private currencyService: CurrencyService,
    private activateRouter: ActivatedRoute,
    private statusService: StatusService,
    private fb: FormBuilder

  ) {
    this.activateRouter.paramMap.subscribe(
      (params: Params) => {
        if (params.params.id) {

          this.statuses = this.statusService.getStatus("PUB")

          this.subcriptionPubliction = this.publicationService.getPublication(params.params.id).subscribe(
            res => {
              this.publicationEdit = res
              this.createForm()
            }
          )
          this.edit = true;

        } else {
          this.publicationEdit = null
        }
      }
    )

  }

  ngOnInit(): void {
    this.transactionsTipes = this.transactionsTypeService.getTransactionTypes().pipe(map(v => v.data.data))
    this.currencies = this.currencyService.getCurrencies()
    // this.publicationEdit = this.publicationService.publicationOnEdit
    // console.log(this.publicationEdit);

  }




  createForm() {
    this.form = this.fb.group({
      property_id: [this.publicationEdit?.property_id],
      title: [this.publicationEdit?.property.title],
      status_id: [this.publicationEdit.status_id],
      transaction_types: this.buildTransactionTypes()

    })
    console.log(this.form.value);

  }


  buildTransactionTypes() {
    // v => {
    //   return { 'transaction_type_id': v.id, 'currency_id': v.pivot.currency.id, }
    // })
    const value = this.publicationEdit.transaction_types.map(
      (v, i) => {
        const arr = this.fb.group({
          "transaction_type_id": [v.id, Validators.required],
          "currency_id": [v.pivot.currency.id, Validators.required],
          "price": [v.pivot.price, Validators.required]
        })
        return arr
      }
    )

    return this.fb.array(value)
  }


  addFormControlTransaction() {
    const transactions = this.form.get('transaction_types') as FormArray;

    const newTransaction = this.fb.group({
      "transaction_type_id": [null, Validators.required],
      "currency_id": [null, Validators.required],
      "price": [0, Validators.required]
    })
    // transactions.patchValue([newTransaction])
    transactions.push(newTransaction)

  }

  dataSubmit() {
    const data = this.form.value
    if (this.publicationEdit) {
      console.log(this.publicationEdit);

      this.updatePublication(data)
    } else {
      this.subcriptionPubliction = this.publicationService.publicationOnEdit.subscribe(res => this.publicationEdit = res)

      this.addPublication(data.data)

    }


  }

  addPublication(data) {
    this.publicationService.storePublication(data).pipe(take(1)).subscribe(
      res => {
        console.log(res);
        // this.publicationService.setPublicationOnEdit(res)
      }
    )
  }

  updateFeatures(data) {
    this.updatePublication(data)

  }

  removeTransaction(index){
    const transactions = this.form.get('transaction_types') as FormArray;
    transactions.removeAt(index)
  }

  updatePublication(data) {
    this.publicationService.updatePublication(data).pipe(take(1)).subscribe(
      res => {
        console.log(res);
      }
    )
  }


  ngOnDestroy() {
    this.subcriptionPubliction.unsubscribe()
  }

}
