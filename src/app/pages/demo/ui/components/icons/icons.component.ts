import { Component, OnInit } from '@angular/core';
import { IconsService } from './icons.service';
import 'style-loader!./icons.component.scss';

@Component({
  selector: 'page-icons',
  templateUrl: './icons.component.html',
})
export class IconsComponent implements OnInit {

  icons: any;

  constructor(private iconsService: IconsService) {}

  ngOnInit() {
    this.icons = this.iconsService.getAll();
  }
}
