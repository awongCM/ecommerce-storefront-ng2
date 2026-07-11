import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { PopupCartComponent } from './popup-cart.component';
import { CartService } from '../../services/cart.service';
import { routes } from '../../app.routes';

describe('PopupCartComponent', () => {
  let fixture: ComponentFixture<PopupCartComponent>;
  let component: PopupCartComponent;
  let router: Router;
  let cartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupCartComponent],
      providers: [provideRouter(routes)],
    }).compileComponents();

    router = TestBed.inject(Router);
    cartService = TestBed.inject(CartService);
    fixture = TestBed.createComponent(PopupCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('toggles only from the cart button', () => {
    component['toggleCart']();
    expect(component['isOpen']()).toBeTrue();

    component['closeCart']();
    expect(component['isOpen']()).toBeFalse();
  });

  it('closes after navigation', async () => {
    component['toggleCart']();
    expect(component['isOpen']()).toBeTrue();

    await router.navigateByUrl('/category');
    fixture.detectChanges();

    expect(component['isOpen']()).toBeFalse();
  });

  it('shows total item quantity in the badge', () => {
    cartService.addItem({
      id: 1,
      brand: 'Kiriko',
      title: 'Plate',
      price: 40,
      quantity: 3,
      image: 'plate.jpg',
    });
    fixture.detectChanges();

    const toggle: HTMLButtonElement | null =
      fixture.nativeElement.querySelector('.popup-cart-toggle');
    expect(toggle?.textContent).toContain('3');
  });
});
