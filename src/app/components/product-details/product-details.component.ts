import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { Product } from '../../models/product.model';
import { CartItem } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);

  protected readonly product = toSignal(
    this.route.paramMap.pipe(
      map((params) => this.productService.getProduct(Number(params.get('id'))))
    )
  );

  protected quantity = signal(1);

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
