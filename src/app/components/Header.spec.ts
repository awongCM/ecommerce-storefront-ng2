import {Component, Input, Output, EventEmitter, DebugElement} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {HeaderComponent} from './Header';
import {By} from '@angular/platform-browser';
import {TestBed, async} from '@angular/core/testing';

describe('Header component', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.provideStore({}, {})
      ],
      declarations: [
        HeaderComponent
      ]
    });
    TestBed.compileComponents();
  }));

  it('should render correctly', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const header = fixture.nativeElement;
    expect(header.querySelector('header')).not.toBeNull();
    expect(header.querySelector('header').className).toBe('header');
  });
});
