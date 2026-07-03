import { Injectable, computed, signal } from '@angular/core';

import { CartItem } from '../models/cart-item.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly items = signal<CartItem[]>([]);

  readonly cartItems = this.items.asReadonly();
  readonly cartCount = computed(() => this.items().length);
  readonly cartTotal = computed(() =>
    this.items().reduce((total, item) => total + item.price * item.quantity, 0)
  );

  addItem(item: CartItem): void {
    const existingItem = this.items().find((cartItem) => cartItem.id === item.id);

    if (!existingItem) {
      this.items.update((items) => [...items, { ...item }]);
      return;
    }

    this.items.update((items) =>
      items.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
          : cartItem
      )
    );
  }

  removeItem(item: CartItem): void {
    this.items.update((items) => items.filter((cartItem) => cartItem.id !== item.id));
  }

  updateItem(item: CartItem): void {
    this.items.update((items) =>
      items.map((cartItem) => (cartItem.id === item.id ? { ...item } : cartItem))
    );
  }
}
