import {Component, Input} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Location } from "@angular/common";

import {Product} from "../models/Product";
import {CartItem } from "../models/CartItem";
import { ProductService } from "../services/ProductService";
import { CartService } from "../services/CartService";

import "rxjs/add/operator/switchMap";


@Component({
  selector: 'product-details',
  template: require('./ProductDetails.html'),
  styleUrls: [require('./ProductDetails.scss').toString()]
})
export class ProductDetailsComponent {

  private quantity: number;
  
  @Input() product: Product;
  @Input() cartItem: CartItem;

  constructor(private route: ActivatedRoute, private productService: ProductService, 
              private cartService: CartService, private location: Location) {
    this.route.params
        .switchMap((params: Params) => this.productService.getProduct(+params['id']))
        .subscribe((product: Product) => this.product = product);
    
    this.route.params
        .switchMap((params: Params) => this.cartService.getCartItem(+params['id']))
        .subscribe((cartItem: CartItem) => this.cartItem = cartItem);
    this.quantity = 1;
  }

  goBack(): void {
    this.location.back();
  }

  incrementQty(): void {
    this.quantity++;    
  }

  decrementQty(): void {
    this.quantity--;
    if(this.quantity < 1) this.quantity = 1;    
  }

  addtoCart(product: Product): void {

    this.cartItem = {
      id: product.id,
      brand: product.brand,
      title: product.title,
      price: product.price,
      quantity: this.quantity,
      image: product.image
    }
    

    this.cartService.addCartItemSource(this.cartItem);
  }



}
