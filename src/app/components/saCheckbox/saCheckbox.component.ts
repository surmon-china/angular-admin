/**
 * @file 复选框组件
 * @desc app/component/checkbox
 * @author Surmon <https://github.com/surmon-china>
 */

import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgModel } from '@angular/forms';

@Component({
  selector: 'sa-checkbox[ngModel]',
  styleUrls: ['./saCheckbox.component.scss'],
  providers: [NgModel],
  templateUrl: './saCheckbox.component.html'
})
export class SaCheckboxComponent implements ControlValueAccessor {
  @Input() disabled: boolean;
  @Input() label: string;
  @Input() value: string;
  @Input() baCheckboxClass: string;
  @Input() baCheckboxLabelClass: string;

  public model: NgModel;
  public state: boolean;

  public constructor(@Self() state: NgModel) {
    this.model = state;
    state.valueAccessor = this;
  }

  public onChange(value: any): void {}
  public onTouch(value: any): void {}
  public writeValue(state: any): void {
    this.state = state;
  }

  public registerOnChange(fn: any): void {
    this.onChange = (state: boolean) => {
      this.writeValue(state);
      this.model.viewToModelUpdate(state);
    };
  }
  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
