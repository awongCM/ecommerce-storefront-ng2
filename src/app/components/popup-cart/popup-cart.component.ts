import { DecimalPipe, NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CartItem } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-popup-cart',
  imports: [DecimalPipe, NgClass, RouterLink],
  templateUrl: './popup-cart.component.html',
  styleUrl: './popup-cart.component.scss',
})
export class PopupCartComponent {
  private readonly cartService = inject(CartService);

  protected readonly cartItems = this.cartService.cartItems;
  protected readonly cartCount = this.cartService.cartCount;
  protected readonly cartTotal = this.cartService.cartTotal;
  protected readonly isOpen = signal(false);

  toggleCart(event: MouseEvent): void {
    event.stopPropagation();
    this.isOpen.update((open) => !open);
  }

  removeCartItem(cartItem: CartItem, event: MouseEvent): void {
    event.stopPropagation();
    this.cartService.removeItem(cartItem);
  }
}
