import {NgModule} from '@angular/core';
import { CommonModule } from "@angular/common";
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {routing, RootComponent} from './routes';

import {AppComponent} from './containers/App';
import {HeaderComponent} from './components/Header';
import {CategorySectionComponent} from "./components/CategorySection";
import {ShoppingCartSectionComponent} from "./components/ShoppingCartSection";
import {ProductDetailsComponent} from "./components/ProductDetails";
import {PopUpCartComponent} from "./components/PopUpCart";
import {CartItemComponent} from "./components/CartItem";

import {ProductService} from "./services/ProductService";
import {CartService} from "./services/CartService";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    routing
  ],
  declarations: [
    RootComponent,
    AppComponent,
    HeaderComponent,
    CategorySectionComponent,
    ProductDetailsComponent,
    ShoppingCartSectionComponent,
    PopUpCartComponent,
    CartItemComponent

  ],
  providers: [ProductService, CartService],
  bootstrap: [RootComponent]
})
export class AppModule {}
