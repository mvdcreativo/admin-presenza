import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuPrincipalComponent } from "./components/menu-principal/menu-principal.component";
import { ItemsComponent } from './components/menu-principal/items/items.component';
import { HeaderMenuComponent } from './components/menu-principal/header-menu/header-menu.component';
import { ButtonsComponent } from './patrones/buttons/buttons.component';
import { PatronesComponent } from './patrones/patrones.component';
import { FormComponent } from './patrones/form/form.component';
import { CardComponent } from './patrones/card/card.component';
import { UserMenuComponent } from './components/header/user-menu/user-menu.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    HeaderComponent, 
    FooterComponent,
    MenuPrincipalComponent,
    ItemsComponent,
    HeaderMenuComponent,
    ButtonsComponent,
    PatronesComponent,
    FormComponent,
    CardComponent,
    UserMenuComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MenuPrincipalComponent,
    
  ]
})
export class LayoutModule { }
