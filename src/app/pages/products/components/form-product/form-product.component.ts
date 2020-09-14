import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { StatusService } from "src/app/shared/services/status/status.service";
import { Observable } from 'rxjs/internal/Observable';
import { Status } from 'src/app/shared/interfaces/status';
import { UbicationService } from "src/app/shared/services/ubications/ubication.service";
import { PropertyTypes, Product } from '../../interfaces/product';
import { PropertyTypesService } from 'src/app/shared/services/property-type/property-types.service';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mvd-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit, OnDestroy {

  // @Output()changeIndex : EventEmitter<number> = new EventEmitter
  @Output()dataSubmit : EventEmitter<any> = new EventEmitter
  
  
  public form: FormGroup
  statuses: Observable<Status[]>;
  states: Observable<any[]>;
  cities: Observable<any[]>;
  municipalities: Observable<any[]>;
  neighborhoods: Observable<any[]>;
  propertyTypes: Observable<PropertyTypes[]>;
  productEdit$: Observable<Product>;
  subcriptor: Subscription;
  productEdit: Product;


  constructor(
    private fb: FormBuilder,
    private statusSetvice: StatusService,
    private ubicationService: UbicationService,
    private propertyTypeService: PropertyTypesService,
    private productServices: ProductService

  ) { 
    this.productEdit$ = this.productServices.productOnEdit
    this.subcriptor = this.productEdit$.subscribe(p => {this.productEdit = p; this.createForm()})
    // console.log(this.productEdit);
  }

  ngOnInit(): void {
    this.getStatus()
    // console.log(this.form.value);
    
    this.getPropertyType()

    this.states = this.ubicationService.getStates();
    this.cities = this.ubicationService.getCities();
    this.municipalities = this.ubicationService.getMunicipality();

    this.neighborhoods = this.ubicationService.getNeighborhoods();
    // this.productEdit$ = this.productServices.productOnEdit
  }

  createForm(){
 
    // console.log(this.productEdit);
    
    this.form = this.fb.group(
      {
        title:  [this.productEdit?.title, Validators.required],
        code:  [this.productEdit?.code, Validators.required],
        address:  [this.productEdit?.address, Validators.required] ,
        description:  [this.productEdit?.description] ,
        status_id:  [this.productEdit?.status_id, Validators.required] ,
        property_type_id:  [this.productEdit?.property_type_id, Validators.required] ,
        neighborhood_id:  [this.productEdit?.neighborhood_id, Validators.required] ,
        latitude:  [this.productEdit?.latitude] ,
        longitude:  [this.productEdit?.longitude] ,
        user_owner_id:  [this.productEdit?.user_owner_id ?? 1, Validators.required] ,
        images: [this.productEdit?.images],
        videos: [null],
        city: [this.productEdit?.neighborhood?.municipality?.city_id],
        state: [this.productEdit?.neighborhood?.municipality?.city?.province_id],
        municipality: [this.productEdit?.neighborhood?.municipality_id],

      }
    )
    // console.log(this.form.value);

  }

  getStatus(){
    this.statuses = this.statusSetvice.getStatus("PR,ALL")
  }



  public onSelectState() {
    this.form.controls['city'].setValue(null, { emitEvent: false });
    this.form.controls['municipality'].setValue(null, { emitEvent: false });
    this.form.controls['neighborhood_id'].setValue(null, { emitEvent: false });
  }
  public onSelectCity() {
    this.form.controls['municipality'].setValue(null, { emitEvent: false });
    this.form.controls['neighborhood_id'].setValue(null, { emitEvent: false });

  }
  public onSelectMunicipality() {
    this.form.controls['neighborhood_id'].setValue(null, { emitEvent: false });
  }
  public onSelectNeighborhood() {
    // this.form.controls['street'].setValue(null, {emitEvent: false});
  }

  onSubmit(){
    // this.changeIndex.emit(1)
    this.dataSubmit.emit({data: this.form.value, indexTab:0})
  }

  getPropertyType(){
    this.propertyTypes = this.propertyTypeService.getPropertyTypes()
  }

  ngOnDestroy(){
    this.subcriptor.unsubscribe()
  }
}
