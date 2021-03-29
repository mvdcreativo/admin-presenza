import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { PipesModule } from "./pipes/pipes.module";
import { InputSearchComponent } from './components/input-search/input-search.component';
import { ModalLocationsComponent } from './components/modals/modal-locations/modal-locations.component';
import { ConfirmComponent } from './components/modals/confirm/confirm.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { ModalReutilComponent } from './components/modals/modal-reutil/modal-reutil.component';
import { DinamicFormComponent } from './components/dinamic-form/dinamic-form.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    DataTableComponent,
    InputSearchComponent,
    ModalLocationsComponent,
    ConfirmComponent,
    SnackBarComponent,
    ModalReutilComponent,
    DinamicFormComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    PipesModule,
    GooglePlaceModule,
    

  ],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    DataTableComponent,
    PipesModule,
    InputSearchComponent,
    ModalLocationsComponent,
    ModalReutilComponent,
    DinamicFormComponent,
    GooglePlaceModule,
    
    
  ]
})
export class SharedModule { }
