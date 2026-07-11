import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';

import { CartService } from '../../services/cart.service';
import { CartItemComponent } from '../cart-item/cart-item.component';

@Component({
  selector: 'app-shopping-cart-section',
  imports: [DecimalPipe, CartItemComponent],
  templateUrl: './shopping-cart-section.component.html',
  styleUrl: './shopping-cart-section.component.scss',
})
export class ShoppingCartSectionComponent {
  private readonly cartService = inject(CartService);
  private readonly location = inject(Location);

  protected readonly cartItems = this.cartService.cartItems;
  protected readonly cartTotal = this.cartService.cartTotal;

  goBack(): void {
    this.location.back();
  }
}
