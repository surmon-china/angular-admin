import { Component } from '@angular/core';

@Component({
  selector: 'box-checkbox-inputs',
  templateUrl: './checkboxInputs.component.html',
})
export class CheckboxInputsComponent {

  public checkboxModel = false;
  public checkboxModel2 = false;
  public checkboxModel3 = true;
  public checkboxModel4 = false;

  constructor() {}
}
