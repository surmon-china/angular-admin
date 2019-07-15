import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'page-modals',
  styleUrls: ['./modals.scss'],
  templateUrl: './modals.html'
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
