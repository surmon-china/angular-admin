// import {Component, ViewEncapsulation} from '@angular/core';
// import {Location} from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'comment',
  styles: [require('./comment.scss')],
  template: require('./comment.html'),
})
// export class Comment {
//   constructor(location: Location) {
//     console.log(location);
//   }
// }
export class Comment implements OnInit {
    constructor(@Inject(ActivatedRoute) private router: ActivatedRoute) { }

    ngOnInit() {
      console.log(this.router)
        // this.router.params.subscribe((params: Params) => {
        //     // params
        //     console.log(params)
        // });
    }
}
