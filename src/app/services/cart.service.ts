import { Injectable, computed, signal } from '@angular/core';

import { CartItem } from '../models/cart-item.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly items = signal<CartItem[]>([]);

  readonly cartItems = this.items.asReadonly();
  readonly cartCount = computed(() =>
    this.items().reduce((count, item) => count + item.quantity, 0)
  );
  readonly cartTotal = computed(() =>
    this.items().reduce((total, item) => total + item.price * item.quantity, 0)
  );

  addItem(item: CartItem): void {
    const normalizedItem = this.normalizeItem(item);
    if (!normalizedItem) {
      return;
    }

    const existingItem = this.items().find((cartItem) => cartItem.id === normalizedItem.id);

    if (!existingItem) {
      this.items.update((items) => [...items, normalizedItem]);
      return;
    }

    this.items.update((items) =>
      items.map((cartItem) =>
        cartItem.id === normalizedItem.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity + normalizedItem.quantity,
            }
          : cartItem
      )
    );
  }

  removeItem(item: CartItem): void {
    this.items.update((items) => items.filter((cartItem) => cartItem.id !== item.id));
  }

  updateItem(item: CartItem): void {
    const normalizedItem = this.normalizeItem(item);
    if (!normalizedItem) {
      return;
    }

    this.items.update((items) =>
      items.map((cartItem) =>
        cartItem.id === normalizedItem.id ? normalizedItem : cartItem
      )
    );
  }

  private normalizeItem(item: CartItem): CartItem | null {
    if (!Number.isFinite(item.id) || item.id <= 0) {
      return null;
    }

    const quantity = this.normalizeQuantity(item.quantity);
    if (quantity === null) {
      return null;
    }

    return { ...item, quantity };
  }

  private normalizeQuantity(quantity: number): number | null {
    if (!Number.isFinite(quantity) || quantity <= 0) {
      return null;
    }

    return Math.floor(quantity);
  }
}
