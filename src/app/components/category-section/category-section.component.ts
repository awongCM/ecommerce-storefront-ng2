import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Product } from '../../models/product.model';
import { CartItem } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-category-section',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './category-section.component.html',
  styleUrl: './category-section.component.scss',
})
export class CategorySectionComponent {
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);

  protected readonly products = this.productService.getProducts();

  addToCart(product: Product): void {
    const cartItem: CartItem = {
      id: product.id,
      brand: product.brand,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    };

    this.cartService.addItem(cartItem);
  }
}
