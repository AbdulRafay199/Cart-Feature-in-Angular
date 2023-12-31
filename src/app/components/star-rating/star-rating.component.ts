import { NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [NgFor],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent implements OnInit {

  @Input() rate:number=0;
  @Input() total:number=0;

  selectedStars:number[] = [];
  unselectedStars:number[] = [];
  unchecked:number = 5;
  totalStars:number[]= Array(this.total).fill(0).map((x,i)=>i);


  ngOnInit(): void {
    // console.log(this.total)
    this.unchecked = this.total - Math.round(this.rate) 
    this.selectedStars = Array(Math.round(this.rate)).fill(0).map((x,i)=>i);
    this.unselectedStars = Array(this.unchecked).fill(0).map((x,i)=>i);
  }
}
