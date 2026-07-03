import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('starts with an empty cart', () => {
    expect(service.cartItems()).toEqual([]);
    expect(service.cartCount()).toBe(0);
    expect(service.cartTotal()).toBe(0);
  });

  it('adds new items and merges duplicate quantities', () => {
    const item = {
      id: 1,
      brand: 'Kiriko',
      title: 'Plate',
      price: 40,
      quantity: 1,
      image: 'plate.jpg',
    };

    service.addItem(item);
    service.addItem({ ...item, quantity: 2 });

    expect(service.cartCount()).toBe(1);
    expect(service.cartItems()[0].quantity).toBe(3);
    expect(service.cartTotal()).toBe(120);
  });

  it('removes and updates items', () => {
    const item = {
      id: 2,
      brand: 'Kiriko',
      title: 'Dish',
      price: 28,
      quantity: 2,
      image: 'dish.jpg',
    };

    service.addItem(item);
    service.updateItem({ ...item, quantity: 1 });
    expect(service.cartItems()[0].quantity).toBe(1);

    service.removeItem(item);
    expect(service.cartItems()).toEqual([]);
  });
});
