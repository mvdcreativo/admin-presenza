import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { take } from 'rxjs/operators';
import { PropertyTypesService } from "src/app/shared/services/property-type/property-types.service";
import { Observable } from 'rxjs';
import { PropertyTypes, Product, OptionSelect } from '../interfaces/product';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  indexTab:number = 0;
  // id: number = 101
  productEdit: Observable<Product>;
  edit: boolean = false;
  

  constructor(
    private productService: ProductService,
    private activateRouter: ActivatedRoute
  ) { 
    this.activateRouter.paramMap.subscribe(
      (params:Params) => {
        if(params.params.id){
          
          this.productEdit = this.productService.getProduct(params.params.id)
          this.edit= true;
        }else{
          this.productEdit = null
        }
      }
    )

  }

  ngOnInit(): void {

    // this.productEdit = this.productService.productOnEdit
    // console.log(this.productEdit);
    
  }

  dataSubmit(data){
    if(data.indexTab === 0 ) {
      if (this.productEdit) {
        console.log(this.productEdit);
        
        console.log(this.indexTab);
        
        this.updateProduct(data.data)
      }else{
        this.productEdit = this.productService.productOnEdit

        this.addProduct(data.data)
        
      }
    }
   
  }

  addProduct(data){
    this.productService.storeProduct(data).pipe(take(1)).subscribe(
      res=> {
        console.log(res);
        
        this.indexTab = 1
        // this.productService.setProductOnEdit(res)
      }
    )
  }

  updateFeatures(data){
    this.updateProduct(data)

  }

  updateProduct(data){
    this.productService.updateProduct(data).pipe(take(1)).subscribe(
      res=> {
        console.log(res);
        this.indexTab++
        
      }
    )
  }

}
