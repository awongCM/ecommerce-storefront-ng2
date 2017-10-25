import {Product} from '../models/Product';
import { ProductService } from "./ProductService";

describe('ProductService', () => {
  let service: ProductService;
  beforeEach(() => {
    service = new ProductService();
  });

  it('#getProducts should return at least 1 product', (done: DoneFn) => {
    service.getProducts().then(items => {
      expect(items.length).toBeGreaterThan(1);
      done();
    })
  });

  it('#getProduct should return exactly one product based on id', (done: DoneFn) => {
    service.getProduct(1).then(item => {
      expect(item).not.toBeUndefined();
      done();
    });
  });

  //TODO - add unit testing for observables data services
});
