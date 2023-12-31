import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchproducts } from '../../shared/store/productStore/product.actions';
import { ProductsService } from '../../services/products.service';
import { ItemsCardComponent } from "../items-card/items-card.component";
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-items-container',
    standalone: true,
    templateUrl: './items-container.component.html',
    styleUrl: './items-container.component.css',
    imports: [ItemsCardComponent,NgFor]
})
export class ItemsContainerComponent implements OnInit {

  store = inject(Store);
  productService = inject(ProductsService)
  productsList:any;

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
      console.log('Data from store:', data);
      this.productsList = data.products;
    });
  }




}
