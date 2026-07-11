import { Injectable } from '@angular/core';

import { Product } from '../models/product.model';
import { PRODUCTS } from './products';

@Injectable({ providedIn: 'root' })
export class ProductService {
  getProducts(): Product[] {
    return PRODUCTS;
  }

  getProduct(id: number): Product | undefined {
    return PRODUCTS.find((product) => product.id === id);
  }
}
