import { Component } from '@angular/core';

@Component({
  selector: 'box-checkbox-inputs',
  templateUrl: './checkboxInputs.component.html',
})
export class CheckboxInputsComponent {
  public checkboxModel = [{
    name: 'Check 1',
    checked: false,
    class: 'col-md-4'
  }, {
    name: 'Check 2',
    checked: true,
    class: 'col-md-4'
  }, {
    name: 'Check 3',
    checked: false,
    class: 'col-md-4'
  }];

  public checkboxPropertiesMapping = {
    model: 'checked',
    value: 'name',
    label: 'name',
    baCheckboxClass: 'class'
  };

  public isDisabled: boolean;

  constructor() {}
}
