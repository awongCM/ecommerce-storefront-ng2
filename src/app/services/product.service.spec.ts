import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
  });

  it('returns the mock catalog', () => {
    expect(service.getProducts().length).toBeGreaterThan(0);
  });

  it('returns a product by id', () => {
    expect(service.getProduct(1)?.title).toContain('Blue Stripe');
  });

  it('returns undefined for unknown products', () => {
    expect(service.getProduct(999)).toBeUndefined();
    expect(service.getProduct(Number.NaN)).toBeUndefined();
  });
});
