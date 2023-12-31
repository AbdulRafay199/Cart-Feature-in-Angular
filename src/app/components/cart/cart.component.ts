import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ItemsCardComponent } from "../items-card/items-card.component";
import { CurrencyPipe, NgFor } from '@angular/common';
import { reset } from '../../shared/store/counterStore/counter.actions';

@Component({
    selector: 'app-cart',
    standalone: true,
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css',
    imports: [ItemsCardComponent, CurrencyPipe, NgFor]
})
export class CartComponent implements OnInit {

  store = inject(Store)
  myitems!:any;
  totalprice:number = 0;

  ngOnInit(): void {
    this.store.select("counter").subscribe(data=>{
      this.myitems = data.cartItems
      this.totalprice = 0
      data.cartItems.forEach((element: { price: number; }) => {
        this.totalprice = this.totalprice + element.price
      });
      console.log("popup cart items: ", this.myitems)
    })
  }

  clearCart = ()=>{
    this.store.dispatch(reset())
  }

}
