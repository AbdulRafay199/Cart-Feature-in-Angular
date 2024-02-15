import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ItemsCardComponent } from "../items-card/items-card.component";
import { CurrencyPipe, NgFor } from '@angular/common';
import { reset } from '../../shared/store/counterStore/counter.actions';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-cart',
    standalone: true,
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css',
    imports: [ItemsCardComponent, CurrencyPipe, NgFor,TableModule]
})
export class CartComponent implements OnInit {

  store = inject(Store)
  myitems!:any;
  uniqueItems:any = [];
  totalprice:number = 0;

  ngOnInit(): void {
    this.store.select("counter").subscribe(data=>{
      this.myitems = data.cartItems
      this.totalprice = 0
      data.cartItems.forEach((element: { price: number; }) => {
        this.totalprice = this.totalprice + element.price
      });
      this.uniqueItems = []
      this.createCartUnique();
      // console.log("popup cart items: ", this.uniqueItems)
    })
  }

  createCartUnique(){
    this.myitems.forEach((element:any) => {
      if(this.uniqueItems.length>0){
        let alreadyPresent = false
        this.uniqueItems.forEach((distinct:any)=>{
          if(distinct.product.id === element.id){
            const index = this.uniqueItems.indexOf(distinct);
            // console.log("index: ",index)
            this.uniqueItems[index] = {...this.uniqueItems[index], qty: this.uniqueItems[index]?.qty+1}
            this.uniqueItems[index] = {...this.uniqueItems[index], totalPrice: distinct.product.price*this.uniqueItems[index]?.qty}
            alreadyPresent = true;
          }
        })
        if(!alreadyPresent){
          this.uniqueItems.push({product:element,qty:1,totalPrice:element.price})
        }
      }
      else{
        this.uniqueItems.push({product:element,qty:1,totalPrice:element.price})
      }
    });
    // console.log("my cart: ", this.uniqueItems)
  }

  clearCart = ()=>{
    this.store.dispatch(reset())
    localStorage.removeItem('cart')
  }

}
