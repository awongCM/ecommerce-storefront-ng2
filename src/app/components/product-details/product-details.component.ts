import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { distinctUntilChanged, map } from 'rxjs';

import { Product } from '../../models/product.model';
import { CartItem } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-details',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);

  protected readonly productId = toSignal(
    this.route.paramMap.pipe(
      map((params) => Number(params.get('id'))),
      distinctUntilChanged()
    ),
    { initialValue: Number.NaN }
  );

  protected readonly product = computed(() => {
    const id = this.productId();
    if (!Number.isFinite(id) || id <= 0) {
      return undefined;
    }

    return this.productService.getProduct(id);
  });

  protected readonly isProductNotFound = computed(() => {
    const id = this.productId();
    return Number.isFinite(id) && id > 0 && !this.product();
  });

  protected quantity = signal(1);

  constructor() {
    effect(() => {
      this.productId();
      this.quantity.set(1);
    });
  }

  incrementQty(): void {
    this.quantity.update((value) => value + 1);
  }

  decrementQty(): void {
    this.quantity.update((value) => (value > 1 ? value - 1 : 1));
  }

  addToCart(product: Product): void {
    const cartItem: CartItem = {
      id: product.id,
      brand: product.brand,
      title: product.title,
      price: product.price,
      quantity: this.quantity(),
      image: product.image,
    };

    this.cartService.addItem(cartItem);
  }
}
