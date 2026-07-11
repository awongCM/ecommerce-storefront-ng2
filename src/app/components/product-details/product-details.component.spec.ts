import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { ProductDetailsComponent } from './product-details.component';
import { routes } from '../../app.routes';

describe('ProductDetailsComponent', () => {
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    }).compileComponents();

    harness = await RouterTestingHarness.create();
  });

  it('renders a product when the route id is valid', async () => {
    await harness.navigateByUrl('/product/1', ProductDetailsComponent);

    const element = harness.routeNativeElement as HTMLElement;
    expect(element.textContent).toContain('Blue Stripe Stoneware Plate');
    expect(element.textContent).not.toContain('Product not found');
  });

  it('shows a not-found message for unknown products', async () => {
    await harness.navigateByUrl('/product/999', ProductDetailsComponent);

    const element = harness.routeNativeElement as HTMLElement;
    expect(element.textContent).toContain('Product not found');
    expect(element.textContent).toContain('999');
  });

  it('resets quantity when navigating to another product', async () => {
    const firstComponent = await harness.navigateByUrl(
      '/product/1',
      ProductDetailsComponent
    );
    firstComponent.incrementQty();
    firstComponent.incrementQty();
    expect(firstComponent['quantity']()).toBe(3);

    const secondComponent = await harness.navigateByUrl(
      '/product/2',
      ProductDetailsComponent
    );
    expect(secondComponent['quantity']()).toBe(1);
  });
});
