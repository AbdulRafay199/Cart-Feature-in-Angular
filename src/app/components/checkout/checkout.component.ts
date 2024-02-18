import { Component, ViewChild, inject } from '@angular/core';
import { Validators, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

import {StripeCardComponent, injectStripe } from 'ngx-stripe';
import { CheckoutService } from '../../services/checkout/checkout.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { reset } from '../../shared/store/counterStore/counter.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, StripeCardComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  @ViewChild(StripeCardComponent) card!: StripeCardComponent;
  checkoutServices = inject(CheckoutService)
  store = inject(Store)
  router = inject(Router)

  name = new FormControl('',Validators.required)
  email = new FormControl('',[Validators.required,Validators.email])

  checkoutForm = new FormGroup({
    name:this.name,
    email:this.email,
  })

  
  stripe = injectStripe(
    'pk_test_51OicpKFcIATMhxWQc6PRGeHb9FDOm2gQR8VGJVLMpxsohgcJFLuItYfdvE3o5tOA6F17VAy79VQZy2oQXBMxnYvl00Dw4F1a23'
  );
  myitems: any;
  totalprice!: number;
  uniqueItems: any[] = [];

  createToken(): void {
    const name = this.name.value || undefined;
    this.stripe.createToken(this.card.element, {name}).subscribe((result) => {
      if (result.token) {
        // Use the token
        this.getCart();
        const resultobj = {stripeToken:result.token.id,totalPrice:this.totalprice,cart:this.uniqueItems,username:name,email:this.email.value}
        console.log(resultobj)
        this.checkoutServices.proceedPayment(resultobj).subscribe((data)=>{
          if(data.success){
            alert(data.msg)
            localStorage.removeItem('cart')
            this.store.dispatch(reset())
            this.router.navigate(['/'])
          }
          else{
            alert(data.msg)
            this.router.navigate(['/'])
          }
        })
      } else if (result.error) {
        // Error creating the token
        console.log(result.error.message);
      }
    });
  }

  getCart(){
    this.store.select("counter").subscribe(data=>{
      this.myitems = data.cartItems
      this.totalprice = 0
      data.cartItems.forEach((element: { price: number; }) => {
        this.totalprice = this.totalprice + element.price
      });
      this.uniqueItems = []
      this.createCartUnique().subscribe(res=>{
        this.uniqueItems= res
      })
      // console.log("popup cart items: ", this.uniqueItems)
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
  }

}
