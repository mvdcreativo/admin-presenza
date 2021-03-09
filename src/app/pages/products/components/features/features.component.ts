import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FeatureService } from 'src/app/shared/services/features/feature.service';
import { Feature, Product, OptionSelect } from '../../interfaces/product';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import forms  from '../../../../../assets/data/forms.json';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'mvd-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent implements OnInit, OnDestroy {
  features: Feature[];
  @Output() dataFeatures : EventEmitter<any> = new EventEmitter
 
  options: any;

  public form: FormGroup
  productEdit$: Observable<Product>;
  subcriptor: Subscription;
  productEdit: Product;
  constructor(
    private featureService: FeatureService,
    private fb: FormBuilder,
    private productServices: ProductService
  ) { 
    this.getFeatures();
    this.options =  forms.selects//datos desde archivo json en shared/utils
 
  }

  ngOnInit(): void {
    this.productEdit$ = this.productServices.productOnEdit
  }

  getFeatures() {
    this.featureService.getFeatures().pipe(take(1)).subscribe(
      res => {
        // this.features = res
        this.features = res
        console.log(this.features);

        
        this.subcriptor = this.productEdit$.subscribe(p => {this.productEdit = p;})
        // console.log(this.form.value);
        this.createForm()
      }
    );
  }

  private createForm() {
    // console.log(this.productEdit);

    this.form = this.fb.group({
      features: this.addGroups()
    })
    
    const value = this.features.map( (v,i) => this.addFeatures(v,i) )
  }

  addGroups() {


    const value = this.features.map((v,i)=> new FormArray([]))
    
    return this.fb.array(value)


  }


  addFeatures(group?,index?) {
    // console.log(this.form.get([0]))
    
    let control = this.form.get(['features', index]) as FormArray
    let values = group.features.map( v => {
      

      if(this.productEdit){
        const featureProduct = this.productEdit?.features?.filter( x => x.pivot.feature_id === v.id)
        // console.log(featureProduct);
        if(featureProduct?.length >=1 ){
          var value = featureProduct[0].pivot.value
          var check = true
        }
      }
        
      control.push(this.fb.group({feature_id: [v.id], value: [value ?? null], check: [check ?? null]}))
    } ) 
    
    return control

  }



  onSubmit() {
    console.log(this.form.value);
    let featuresArr = []
    const formConcat = featuresArr.concat(...featuresArr.concat(...this.form.get('features').value))
    
    const form = formConcat
    .filter( v =>  v.check === true || v.value !== null)
    .map( v => {
      return {feature_id: v.feature_id, value: v.value}
    })
    
    const features = {features: form}
    console.log(features);
    
    this.dataFeatures.emit(features)
    
  }



  ngOnDestroy(){
    this.subcriptor.unsubscribe()
  }
}
