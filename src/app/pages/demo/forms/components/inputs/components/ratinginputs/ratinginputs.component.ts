import { Component } from '@angular/core';

@Component({
  selector: 'box-rating-inputs',
  template: require('./ratinginputs.html')
})

export class RatingComponent {
  private rate1: number = 3;
  private rate2: number = 4;

  private max1: number = 5;
  private max2: number = 10;

  constructor() {}
}
