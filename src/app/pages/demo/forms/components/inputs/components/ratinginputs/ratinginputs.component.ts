import { Component } from '@angular/core';

@Component({
  selector: 'box-rating-inputs',
  template: require('./ratinginputs.html')
})

export class RatingComponent {
  private _rate1: number = 3;
  private _rate2: number = 4;

  private _max1: number = 5;
  private _max2: number = 10;

  constructor() {}
}
