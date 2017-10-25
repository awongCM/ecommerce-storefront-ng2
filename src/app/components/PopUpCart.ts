import {Component} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Location, DecimalPipe} from "@angular/common";

import { CartService } from "../services/CartService";

import { CartItem } from "../models/CartItem";

@Component({
  selector: 'popup-cart',
  template: require('./PopUpCart.html'),
  styleUrls: [require('./PopUpCart.scss').toString()]
})
export class PopUpCartComponent {
  
  private total_cart_items: number;
  private total_price: number;
  private swapped: boolean;
  private cartItems: CartItem[] = [];
  
  constructor(private cartService: CartService ) {
    this.cartService.getCartItems().then(cartItems => this.cartItems = cartItems);

    this.cartService.cartItemsAddedRemoved$.subscribe(
      cartItems => {
        this.total_cart_items = cartItems.length;
        this.cartItems = cartItems;
        this.calculateCartTotal();
    });

    this.cartService.cartItemsUpdated$.subscribe(
      cartItems => {
        this.total_cart_items = cartItems.length;
        this.cartItems = cartItems;
        this.calculateCartTotal();
    });

    this.swapped = false;
  }

  swapClass():void {
    this.swapped = !this.swapped;
  }

  removeCartItem(cartItem: CartItem): void {

    this.cartService.removeCartItemSource(cartItem);
  }

  calculateCartTotal(): void {
    
    this.total_price = (this.cartItems.length === 0) ? 0 
                      : this.cartItems.map( item => item.price * item.quantity).reduce( (a,b)=> a + b);
    
  }
}
