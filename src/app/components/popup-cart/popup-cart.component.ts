import { DecimalPipe } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

import { CartItem } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-popup-cart',
  imports: [DecimalPipe],
  templateUrl: './popup-cart.component.html',
  styleUrl: './popup-cart.component.scss',
})
export class PopupCartComponent {
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly cartItems = this.cartService.cartItems;
  protected readonly cartCount = this.cartService.cartCount;
  protected readonly cartTotal = this.cartService.cartTotal;
  protected readonly isOpen = signal(false);

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.closeCart());
  }

  toggleCart(): void {
    this.isOpen.update((open) => !open);
  }

  closeCart(): void {
    this.isOpen.set(false);
  }

  viewCart(): void {
    this.closeCart();
    void this.router.navigate(['/cart']);
  }

  removeCartItem(cartItem: CartItem): void {
    this.cartService.removeItem(cartItem);
  }
}
