import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'category',
    pathMatch: 'full',
  },
  {
    path: 'category',
    loadComponent: () =>
      import('./components/category-section/category-section.component').then(
        (m) => m.CategorySectionComponent
      ),
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./components/product-details/product-details.component').then(
        (m) => m.ProductDetailsComponent
      ),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./components/shopping-cart-section/shopping-cart-section.component').then(
        (m) => m.ShoppingCartSectionComponent
      ),
  },
];
