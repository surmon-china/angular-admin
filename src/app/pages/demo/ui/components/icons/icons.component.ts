import { Component, OnInit } from '@angular/core';
import { ASSETS_IMAGE } from '@app/constants/url';
import { IconsService } from './icons.service';
import 'style-loader!./icons.scss';

@Component({
  selector: 'page-icons',
  templateUrl: './icons.html',
})
export class IconsComponent implements OnInit {

  icons: any;

  constructor(private iconsService: IconsService) {}

  public getIconPath(input: string): string {
    return ASSETS_IMAGE + 'theme/icon/kameleon/' + input + '.svg';
  }

  ngOnInit() {
    this.icons = this.iconsService.getAll();
  }
}
