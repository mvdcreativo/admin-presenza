import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Fields, OptionSelect } from "./interfaces/fields";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { Observable, pipe, Subscription } from 'rxjs';

import {default as _rollupMoment} from 'moment';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/pages/products/services/product.service';


@Component({
  selector: 'mvd-dinamic-form',
  templateUrl: './dinamic-form.component.html',
  styleUrls: ['./dinamic-form.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class DinamicFormComponent implements OnInit {

  
  
  
  
  @Input() fields : Fields[] = null
  @Output() value : EventEmitter<any> = new EventEmitter
  @Output() changeAutocomplete : EventEmitter<any> = new EventEmitter

  subscription: Subscription
  colorField: Fields[];
  messageUpload: string = null;
  imgPreview: string | ArrayBuffer;
  options: OptionSelect[];
  filterOptions: Observable<OptionSelect[]>;
    
  
  constructor(
    private fb:FormBuilder,
    public dialog: MatDialog,
    public productService: ProductService
    ) { 
      this.form = this.fb.group({})
    }
    
    colorPreview
    public form : FormGroup
    
    ngOnInit(): void {
      this.buildForm()
      // console.log(this.form.value);
      
      if(this.form.get('property_name')){
        console.log('autocomplete');
        
        this.form.get('property_name').valueChanges
        .pipe(
          debounceTime(500),
          
        ).subscribe( value=> {
          console.log(value);
            
          return this._filter(value)
        })
        
       }

      
    }
    
    
    changeForm(value){
      // console.log(value);
      
      this.value.emit(value)
      
    }
    
    private buildForm(){
      
      if (this.fields) {
        const controls = this.fields.map(
          v => {
            if(v.type === 'image' && v.value){
              this.imgPreview = v.value
            }



            return this.form.addControl( v.nameControl , this.fb.control(v.value, v.validators));
          }
          )
          
          
          const fieldColorControl =  this.fields.filter(x => x.type === 'color').map(v => v.nameControl);
          
          if(this.form.get(fieldColorControl)){
            this.colorPreview = this.form.get(fieldColorControl).value
            
          }



          
          
        }
        
        
      }
      
      
      chanhgeColor(){
        
        const fieldColorControl =  this.fields.filter(x => x.type === 'color').map(v => v.nameControl);
        this.form.get(fieldColorControl).patchValue(
          this.colorPreview
          )
          console.log(this.colorPreview);
          
        }
        
        
        
        uploadImage(e){
          console.log(e.target.files);
          if (e?.target?.files[0]) {
            
            const selectedFile = e.target.files[0];
            
            var mimeType = selectedFile.type;
            if (mimeType.match(/image\/*/) == null) {
              this.messageUpload = "No es una imágen";
              this.imgPreview = null;
              this.form.get('image').patchValue(null)
              return;
            }
            
            this.form.get('image').patchValue(selectedFile)
            this.messageUpload = null
            var reader = new FileReader();
            reader.readAsDataURL(selectedFile); 
            reader.onload = (_event) => { 
              this.imgPreview = reader.result; 
            }
            const fileNames = [];
            console.log(selectedFile);
            
            // console.log(this.files);
            
            // this.imagesServices.uploadImage(this.data, selectedFiles)
            
          }else{
            const imgExist = this.form.get('image').value
            if (imgExist) {
              this.imgPreview = imgExist
            }else{
              this.imgPreview = null;
              this.form.get('image').patchValue(null)
            }
          }
        }
        
        
        
        ///autocomplete
        private _filter(value: string): OptionSelect[] {
          const filterValue = value.toLowerCase();
          const res = this.productService.getProducts(1,20, filterValue)
          .pipe(
            map( v=> {
              const res = v.data.data
              
              return res.map( x=> {
                if (res.length === 1) {
                  this.form.get('property_id').setValue(x.id)
                }else{
                  this.form.get('property_id').setValue(null)
                }
                return {name: x.title, value: x.id}
              })
            })
          )
          .subscribe( res => this.options = res)
          
          return this.options
          
          // return this.options.filter(option => option.toLowerCase().includes(filterValue));
        }


      }
      