import {ShoppingCartSectionComponent} from './ShoppingCartSection';
import {TestBed, async} from '@angular/core/testing';

describe('shoppingCartSection component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({declarations: [ShoppingCartSectionComponent]});
    TestBed.compileComponents();
  }));

  it('should render...', () => {
    const fixture = TestBed.createComponent(ShoppingCartSectionComponent);
    fixture.detectChanges();
  });
});
