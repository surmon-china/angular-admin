import { Component, OnInit } from '@angular/core';
import { IconsService } from './icons.service';
import { layoutPaths } from 'app/theme';
import 'style-loader!./icons.scss';

@Component({
  selector: 'page-icons',
  templateUrl: './icons.html',
})
export class IconsComponent implements OnInit {

  icons: any;

  constructor(private iconsService: IconsService) {}

  public getIconPath(input: string): string {
    return layoutPaths.images.root + 'theme/icon/kameleon/' + input + '.svg';
  }

  ngOnInit() {
    this.icons = this.iconsService.getAll();
  }
}
