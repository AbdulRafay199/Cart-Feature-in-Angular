import { Component, Input, inject } from '@angular/core';
import { StarRatingComponent } from "../star-rating/star-rating.component";
import { CurrencyPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { add } from '../../shared/store/counterStore/counter.actions';

@Component({
    selector: 'app-items-card',
    standalone: true,
    templateUrl: './items-card.component.html',
    styleUrl: './items-card.component.css',
    imports: [StarRatingComponent, CurrencyPipe]
})
export class ItemsCardComponent {

  store = inject(Store)
  @Input() products:any = {
      "id": 1,
      "title": "iPhone 9",
      "description": "An apple mobile which is nothing like apple",
      "price": 549,
      "discountPercentage": 12.96,
      "rating": 4.69,
      "stock": 94,
      "brand": "Apple",
      "category": "smartphones",
      "thumbnail": "...",
      "images": ["...", "...", "..."]
    }
  
    cartArray:any[] = []


  addtocart = ()=>{
    console.log(this.products)
    this.cartArray = JSON.parse(localStorage.getItem('cart') || "[]")
    this.cartArray.push(this.products)
    localStorage.removeItem('cart')
    localStorage.setItem('cart',JSON.stringify(this.cartArray))
    this.store.dispatch(add({product: JSON.parse(localStorage.getItem('cart') || "[]")}))
    // this.store.select("counter").subscribe(data=>{
    //   localStorage.removeItem('cart')
    //   localStorage.setItem('cart',JSON.stringify(data.cartItems))
    // })
  }
}
