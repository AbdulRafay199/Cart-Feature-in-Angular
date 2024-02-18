import { Routes } from '@angular/router';
import { ItemsContainerComponent } from './components/items-container/items-container.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

export const routes: Routes = [
    {
        path:"",
        component:ItemsContainerComponent
    },
    {
        path:"checkout",
        component:CheckoutComponent
    },

];
