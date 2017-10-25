import {Component} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './containers/App';
import {CategorySectionComponent} from "./components/CategorySection";
import {ProductDetailsComponent } from "./components/ProductDetails";
import { ShoppingCartSectionComponent } from "./components/ShoppingCartSection";

@Component({
  selector: 'fountain-root',
  template: '<fountain-header></fountain-header><router-outlet></router-outlet>'
})
export class RootComponent {}

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'category',
    pathMatch: 'full',
  },
  {
    path: 'category',
    component: CategorySectionComponent
  },
  {
    path: 'product/:id',
    component: ProductDetailsComponent
  },
  {
    path: 'cart',
    component: ShoppingCartSectionComponent
  }

];

export const routing = RouterModule.forRoot(routes);
