import {Injectable} from '@angular/core';
import { CartItem } from '../models/CartItem';

import { Subject } from "rxjs/Subject";


@Injectable()
export class CartService {
  
  private cartItems: CartItem[] = [];

  private cartItemsUpdatedSource  = new Subject<CartItem[]>();
  private cartItemsAddedRemovedSource = new Subject<CartItem[]>();

  cartItemsUpdated$ = this.cartItemsUpdatedSource.asObservable();
  cartItemsAddedRemoved$ = this.cartItemsAddedRemovedSource.asObservable();

  //TODO - to replace promises with observables for these - not sure how yet...
  getCartItems(): Promise<CartItem[]> {
    return Promise.resolve(this.cartItems);
  }
  getCartItem(id: number): Promise<CartItem> {
    return this.getCartItems().then(cartItems => Promise.resolve(cartItems.find(cartItem => cartItem.id === id)));
  }

  //using observables

  addCartItemSource(cartItem: CartItem) {
    
    //finds a duplicate in an existing cart
    const dupCartItem = this.cartItems.map( item => item.id).indexOf(cartItem.id);

    if (dupCartItem === -1) {
      this.cartItems.push(cartItem);
    } else {
      this.cartItems = this.cartItems.map( item => {
        if (item.id === cartItem.id) {item.quantity+=cartItem.quantity;}
        return item;
      });
    }

    this.cartItemsAddedRemovedSource.next(this.cartItems);
  }

  removeCartItemSource(carItem: CartItem) {
    this.cartItems = this.cartItems.filter(item => item.id !== carItem.id);
    this.cartItemsAddedRemovedSource.next(this.cartItems);
  }

  updateCartItemSource(cartItem: CartItem) {
    this.cartItems = this.cartItems.map(item=> {
      if(cartItem.id === item.id) return item = cartItem
      else return item;
    });
    this.cartItemsUpdatedSource.next(this.cartItems);
  }   
  
}

