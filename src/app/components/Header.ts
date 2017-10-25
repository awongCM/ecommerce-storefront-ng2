import {Component} from '@angular/core';
import {CartService} from "../services/CartService";

@Component({
  selector: 'fountain-header',
  template: require('./Header.html'),
  styleUrls: [require('./Header.scss').toString()]
})
export class HeaderComponent {
  private total_cart_items: number;
  private swapped: boolean;

  constructor( private cartService: CartService ) {
    this.cartService.cartItemsAddedRemoved$.subscribe(
      cartItems => {
        this.total_cart_items = cartItems.length;
    });
    this.swapped = false;
  }

  swapClass(): void {
    this.swapped = !this.swapped;
  }

}
