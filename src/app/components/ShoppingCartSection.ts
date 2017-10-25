import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Location, DecimalPipe} from "@angular/common";

import {Product} from "../models/Product";
import {CartItem} from "../models/CartItem";
import {ProductService} from "../services/ProductService";
import {CartService} from "../services/CartService";

import "rxjs/add/operator/switchMap";


@Component({
  selector: 'shopping-cart-section',
  template: require('./ShoppingCartSection.html'),
  styleUrls: [require('./ShoppingCartSection.scss').toString()]
})

export class ShoppingCartSectionComponent {
  
  private cartItems: CartItem[] = [];
  private cart_price_total: number;
  
  constructor(private productService: ProductService, private cartService: CartService,
              private location: Location) {
    this.cartService.getCartItems().then(cartItems => {
      this.cartItems = cartItems;
      this.calculateCartTotal();
    });
    
    this.cartService.cartItemsAddedRemoved$.subscribe(
      cartItems => {
        this.cartItems = cartItems;
        this.calculateCartTotal();
    });

    this.cartService.cartItemsUpdated$.subscribe(
      cartItems => {
        this.cartItems = cartItems;
        this.calculateCartTotal();
    });

  }
 
  goBack(): void {
    this.location.back();
  }

  calculateCartTotal(): void {
    
    this.cart_price_total = (this.cartItems.length === 0) ? 0 : 
                this.cartItems.map( item => item.price * item.quantity).reduce( (a,b)=> a + b);
    
  }

}
