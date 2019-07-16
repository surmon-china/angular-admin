import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'page-modals',
  styleUrls: ['./modals.component.scss'],
  templateUrl: './modals.component.html'
})
export class ModalsComponent {

  @ViewChild('childModal', { static: false }) childModal: ModalDirective;

  showChildModal(): void {
    this.childModal.show();
  }

  hideChildModal(): void {
    this.childModal.hide();
  }
}
