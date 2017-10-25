import {Component, Input, Output, EventEmitter, DebugElement} from '@angular/core';
import {RouterTestingModule} from "@angular/router/testing";
import {Location } from "@angular/common";
import {ProductDetailsComponent} from './ProductDetails';
import {Product} from "../models/Product";
import {CartItem } from "../models/CartItem";
import { ProductService } from "../services/ProductService";
import { CartService } from "../services/CartService";
import {By} from '@angular/platform-browser';
import {TestBed, async} from '@angular/core/testing';

import "rxjs/add/operator/switchMap";

describe('ProductDetailsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailsComponent],
      imports: [RouterTestingModule],
      providers: [ProductService, CartService]
    });
    TestBed.compileComponents();
  }));

  it('should render...', () => {
    const fixture = TestBed.createComponent(ProductDetailsComponent);
    fixture.detectChanges();
  });
});
