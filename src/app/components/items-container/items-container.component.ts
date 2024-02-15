import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchproducts } from '../../shared/store/productStore/product.actions';
import { ProductsService } from '../../services/products.service';
import { ItemsCardComponent } from "../items-card/items-card.component";
import { NgFor, NgIf } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
    selector: 'app-items-container',
    standalone: true,
    templateUrl: './items-container.component.html',
    styleUrl: './items-container.component.css',
    imports: [ItemsCardComponent,NgFor,SkeletonModule,NgIf]
})
export class ItemsContainerComponent implements OnInit {

  store = inject(Store);
  productService = inject(ProductsService)
  productsList:any;
  status = false;
  skeletons=[1,2,3,4]

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (products) => {
        this.store.dispatch(fetchproducts({ products }));
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );

    this.store.select('products').subscribe((data) => {
      this.productsList = data.products;
      if(this.productsList.products?.length>0){
        this.status = true;
      }
    });

  }




}
