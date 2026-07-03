import { DecimalPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';

import { CartItem } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  imports: [DecimalPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  private readonly cartService = inject(CartService);

  readonly cartItem = input.required<CartItem>();

  removeCartItem(): void {
    this.cartService.removeItem(this.cartItem());
  }

  incrementQty(): void {
    const item = this.cartItem();
    this.cartService.updateItem({ ...item, quantity: item.quantity + 1 });
  }

  decrementQty(): void {
    const item = this.cartItem();
    const quantity = item.quantity > 1 ? item.quantity - 1 : 1;
    this.cartService.updateItem({ ...item, quantity });
  }
}
