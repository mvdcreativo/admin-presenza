import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';
import { LayoutModule } from "./layout/layout.module";

import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { indexAuthInterceptor } from './auth/helpers/index-auth.interceptor';
import { AuthModule } from './auth/auth.module';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    SharedModule,
    AuthModule,

  ],
  exports: [
   
  ],
  providers: [

    indexAuthInterceptor,
    {provide: MAT_DATE_LOCALE, useValue: 'es-UY'},

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
