/**
 * @file 多选框组件
 * @desc app/component/markdownn-editor
 * @author Surmon <https://github.com/surmon-china>
 */

import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgModel } from '@angular/forms';

@Component({
  selector: 'sa-multi-checkbox[ngModel]',
  templateUrl: './saMultiCheckbox.component.html',
})
export class SaMultiCheckboxComponent implements ControlValueAccessor {

  @Input() baMultiCheckboxClass: string;
  @Input() propertiesMapping: any;

  public model: NgModel;
  public state: boolean;

  constructor(@Self() state: NgModel) {
    this.model = state;
    state.valueAccessor = this;
  }

  public onChange(value: any): void {}
  public onTouch(value: any): void {}

  public getProp(item: any, propName: string): string {
    const prop = this.propertiesMapping[propName];
    if (!prop) {
      return item[propName];
    } else if (typeof prop === 'function') {
      return prop(item);
    }
    return item[prop];
  }

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
