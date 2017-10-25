import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Location, DecimalPipe} from "@angular/common";

import {CartItem} from "../models/CartItem";
import {CartService} from "../services/CartService";


@Component({
  selector: 'cart-item',
  template: require('./CartItem.html'),
  styleUrls: [require('./CartItem.scss').toString()]
})
export class CartItemComponent {
  
  @Input() selectedCartItem: CartItem;
  
  constructor(private cartService: CartService) {
      
  }

  removeCartItem(): void {
    this.cartService.removeCartItemSource(this.selectedCartItem);
  }

  incrementQtyByCartItem(): void {
    this.selectedCartItem.quantity++;
    this.cartService.updateCartItemSource(this.selectedCartItem);
    
  }

  decrementQtyByCartItem(): void {
    
    this.selectedCartItem.quantity--;
  
    if(this.selectedCartItem.quantity < 1) this.selectedCartItem.quantity = 1;    
    this.cartService.updateCartItemSource(this.selectedCartItem);
  }

  
}
