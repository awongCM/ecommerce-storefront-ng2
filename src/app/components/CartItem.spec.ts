import {CartItemComponent} from './CartItem';
import {TestBed, async} from '@angular/core/testing';

describe('cartItem component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({declarations: [CartItemComponent]});
    TestBed.compileComponents();
  }));

  it('should render...', () => {
    const fixture = TestBed.createComponent(CartItemComponent);
    fixture.detectChanges();
  });
});
