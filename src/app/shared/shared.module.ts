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
    PipesModule
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
  ]
})
export class SharedModule { }
