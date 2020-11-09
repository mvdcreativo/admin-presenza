import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { ButtonsComponent } from './layout/patrones/buttons/buttons.component';
import { PatronesComponent } from './layout/patrones/patrones.component';
import { CardComponent } from './layout/patrones/card/card.component';
import { AuthGuard } from './auth/guards/auth.guard';


const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },

  { 
    path: '', 
    component: PagesComponent,
    children: [
      { path: 'productos', loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule) },
      { path: 'provincias', loadChildren: () => import('./pages/locations/states/states.module').then(m => m.StatesModule) },
      { path: 'ciudades', loadChildren: () => import('./pages/locations/cities/cities.module').then(m => m.CitiesModule) },
      { path: 'municipalidades', loadChildren: () => import('./pages/locations/municipalities/municipalities.module').then(m => m.MunicipalitiesModule) },
      { path: 'barrios', loadChildren: () => import('./pages/locations/neighborhoods/neighborhoods.module').then(m => m.NeighborhoodsModule) },
      { path: 'categorias', loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesModule) },
      { path: 'tipos-de-operaciones', loadChildren: () => import('./pages/transaction-types/transaction-types.module').then(m => m.TransactionTypesModule) },
      { path: 'caracteristicas', loadChildren: () => import('./pages/features/features.module').then(m => m.FeaturesModule) },
      { path: 'publicaciones', loadChildren: () => import('./pages/publications/publications.module').then(m => m.PublicationsModule) },
      { path: 'moneda', loadChildren: () => import('./pages/currencies/currencies.module').then(m => m.CurrenciesModule) },
      { path: 'clientes', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule) },
      { path: 'usuarios', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule) },
      
      
      { path: '', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: '**', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) },
    ],
    canActivate:[AuthGuard],
    canActivateChild: [AuthGuard]
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
