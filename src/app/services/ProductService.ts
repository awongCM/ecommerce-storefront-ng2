import {Injectable} from '@angular/core';

import { Product } from '../models/Product';

//TODO - RESTFUL API
import { PRODUCTS } from './products';


@Injectable()
export class ProductService {
  getProducts(): Promise<Product[]> {
    return Promise.resolve(PRODUCTS);
  }
  getProduct(id: number): Promise<Product> {
    return this.getProducts().then(products => products.find(product => product.id === id));
  }
}
