import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'mvd-images-product',
  templateUrl: './images-product.component.html',
  styleUrls: ['./images-product.component.scss']
})
export class ImagesProductComponent implements OnInit {
  productEdit$: Observable<Product>;
  product: Product;

  constructor(
    private fb: FormBuilder,
    private productServices: ProductService

  ) { 
    this.productEdit$ = this.productServices.productOnEdit
    this.crateForm();
  }

  ngOnInit(): void {
    this.productEdit$.subscribe(res=> {
      this.product = res

      this.form ? this.form.get('video').setValue(this.product?.videos[0]?.url): this.form.get('video').setValue(null)

    })
  }

  crateForm(){

    this.form = this.fb.group({
      video:[null, Validators.required]
    })
    
  }

  form: FormGroup;
 
  saveVideoUrl(){
    this.form.valid ? this.updateProductVideo() : false
    
  }

  updateProductVideo(){
    const data = this.form.value
    this.productServices.updateProduct(data).subscribe()
  }
}
