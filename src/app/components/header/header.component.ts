import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PopupCartComponent } from '../popup-cart/popup-cart.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, PopupCartComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
