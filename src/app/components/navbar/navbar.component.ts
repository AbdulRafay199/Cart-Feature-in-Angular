import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {MatIconModule} from '@angular/material/icon';
import { CartComponent } from "../cart/cart.component";

@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
    imports: [MatIconModule, CartComponent]
})
export class NavbarComponent implements OnInit{
  count!:number;
  // constructor(private store: Store<{ counter: {count: number}}>){

  // }
  store = inject(Store)

  ngOnInit(){
    this.store.select('counter').subscribe(data=>{
      console.log("data: ", data.cartItems.length)
      this.count = data.cartItems.length;
    })
  }
}
