import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import { FormProductComponent } from './components/form-product/form-product.component';
import { ProductComponent } from './product/product.component';
import { FeaturesComponent } from './components/features/features.component';
import { ImagesDragDropComponent } from "./components/images-product/images-drag-drop/images-drag-drop.component";
import { ImagesProductComponent } from './components/images-product/images-product.component';
import { PublicationsModule } from '../publications/publications.module';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { ImagesComponent } from './components/images/images.component';
import { ThumbnailComponent } from './components/images-product/images-drag-drop/thumbnail/thumbnail.component';


@NgModule({
  declarations: [
    ProductsComponent, 
    FormProductComponent, 
    ProductComponent, 
    FeaturesComponent, 
    ImagesDragDropComponent,
    ImagesProductComponent,
    ImagesComponent,
    ThumbnailComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    PublicationsModule,
    
    AgmCoreModule.forRoot({
      apiKey: environment.API_KEY_GM,
      libraries: ["places"]
    }),
  ],
  exports: [
    
  ThumbnailComponent]
})
export class ProductsModule { }
