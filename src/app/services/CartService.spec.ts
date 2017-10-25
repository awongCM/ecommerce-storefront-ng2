import { CartItem } from "../models/CartItem";
import {CartService} from './CartService';


describe('CartService', () => {
  let service: CartService;
  let cartItem: CartItem;

  beforeEach(() => {
    service = new CartService();
  });

  it('#getCartItems should return at least 1 cart item', (done: DoneFn) => {
    service.getCartItems().then(items => {
      expect(items.length).toBeGreaterThan(1);
      done();
    });
  });

  it('#getCartItem should return exactly one cart item based on id', (done: DoneFn) => {
    service.getCartItem(1).then(item => {
      expect(item).not.toBeNull();
      done();
    });
  });

  //TODO - add unit testing for observables data services

});
