import {Component, Directive, Input, Output, EventEmitter, DebugElement} from '@angular/core';
import { RouterTestingModule } from "@angular/router/testing";
import {CategorySectionComponent} from './CategorySection';
import {ProductService} from "../services/ProductService";
import {Product} from "../models/Product";
import {By} from '@angular/platform-browser';
import {TestBed, async} from '@angular/core/testing';

import { RouterLinkStubDirective } from "./routing_stubs";


describe('Category Section component', () => {
  
  let fixture, productService, spy, dE, el, linkDEs, links,
      testProducts: Product[];

  beforeEach(async(() => {
    
    TestBed.configureTestingModule({
      declarations: [CategorySectionComponent, RouterLinkStubDirective],
      providers: [ProductService], 
    });

    fixture = TestBed.createComponent(CategorySectionComponent);
    
    productService = fixture.debugElement.injector.get(ProductService);
 
    spy = spyOn(productService, 'getProducts')
          .and.returnValue(Promise.resolve(testProducts));

  }));

  it('should render category section correctly', () => {

    fixture.detectChanges();

    dE = fixture.debugElement.query(By.css('h1'));
    el = dE.nativeElement;
    expect(el.textContent).toContain("Plates");
    dE = fixture.debugElement.query(By.css('p'));
    el = dE.nativeElement;
    expect(el.textContent).toContain("Lorem ipsum");

  });

  it('should show a list of six products after getProducts promise', async(() => {
    fixture.detectChanges();

    fixture.whenStable().then(()=> {
      fixture.detectChanges();
      const dEs = fixture.debugElement.queryAll(By.css('li'));
      expect(dEs.length).toBe(6);
    });

  }));

  it('can get RouterLinks from template', async(() => {

    fixture.detectChanges();

    fixture.whenStable().then(()=>{

      fixture.detectChanges();
      
      linkDEs = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
      links = linkDEs.map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);

      expect(links.length).toBe(6, 'should have 6 links');
      expect(links[0].linkParams[0]).toBe('/product', '1st link should go to Product');
    });

  }));
  
  it('can click Product link in template', () => {
    const productsLinkDE = linkDEs[1];
    const productsLink = links[1];
  
    expect(productsLink.navigatedTo).toBeNull('link should not have navigated yet');
  
    productsLinkDE.triggerEventHandler('click', null);
    fixture.detectChanges();
  
    expect(productsLink.navigatedTo[0]).toBe('/product');
  });



});
