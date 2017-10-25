import {Component} from '@angular/core';
import {DecimalPipe} from "@angular/common";
import {Product} from "../models/Product";
import {CartItem} from "../models/CartItem";
import {ProductService} from "../services/ProductService";
import {CartService} from "../services/CartService";

@Component({
  selector: 'category-section',
  template: require('./CategorySection.html'),
  styleUrls: [require('./CategorySection.scss').toString()]
})
export class CategorySectionComponent {
  
  products: Product[];
  selectedCart: CartItem;
  
  constructor(private productService: ProductService, private cartService: CartService) {
  
    this.productService.getProducts().then( products => this.products = products);
  }

  addtoCart(product: Product):void {
    this.selectedCart = {
      id: product.id,
      brand: product.brand,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1
    }

    this.cartService.addCartItemSource(this.selectedCart);
    
  }
  
}
