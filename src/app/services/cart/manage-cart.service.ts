import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { reset } from '../../shared/store/counterStore/counter.actions';

@Injectable({
  providedIn: 'root'
})
export class ManageCartService {

  store = inject(Store)
  myitems!:any;
  uniqueItems:any = [];

  constructor(){
    this.store.select("counter").subscribe(data=>{
      this.myitems = data.cartItems
    })
  }

  createCartUnique():Observable<any>{
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
    return new Observable(observer => {
      observer.next(this.uniqueItems); // Emit uniqueItems array
      observer.complete(); // Complete the observable
    });
    // console.log("my cart: ", this.uniqueItems)
  }

}
