import {PopUpCartComponent} from './PopUpCart';
import {TestBed, async} from '@angular/core/testing';

describe('PopUpCartComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({declarations: [PopUpCartComponent]});
    TestBed.compileComponents();
  }));

  it('should render...', () => {
    const fixture = TestBed.createComponent(PopUpCartComponent);
    fixture.detectChanges();
  });
});
