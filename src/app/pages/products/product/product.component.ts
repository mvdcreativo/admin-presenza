import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { filter, take } from 'rxjs/operators';
import { PropertyTypesService } from "src/app/shared/services/property-type/property-types.service";
import { Observable, Subscription } from 'rxjs';
import { PropertyTypes, Product, OptionSelect } from '../interfaces/product';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';

@Component({
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  indexTab:number = 0;

  // id: number = 101
  productEdit: Product;
  edit: boolean = false;
  subscriptions : Subscription[] = [];
  

  constructor(
    private productService: ProductService,
    private activateRouter: ActivatedRoute,
    private router: Router
  ) { 
    this.activateRouter.paramMap.subscribe(
      (params:Params) => {
        if(params.params.id){


          this.subscriptions.push(
            this.productService.getProduct(params.params.id).subscribe(res=> this.productEdit = res),
          );
          params.params.tab ? this.indexTab = params.params.tab: this.indexTab = 0
          this.edit= true;
        }else{
          this.productEdit = null
        }
      }
    )

  }

  ngOnInit(): void {

    // this.productEdit$ = this.productService.productOnEdit
    // console.log(this.productEdit$);
    
  }

  dataSubmit(data){
    if(data.indexTab === 0 ) {
      if (this.productEdit) {
        console.log(this.productEdit);
        
        console.log(this.indexTab);
        
        this.updateProduct(data.data)
      }else{
        this.subscriptions.push(this.productService.productOnEdit.subscribe(res=> this.productEdit = res))

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

  ngOnDestroy(): void {

    this.subscriptions.map(v=>v.unsubscribe())
  }
}
