/**
 * @file 复选框组件
 * @desc app/component/checkbox
 * @author Surmon <https://github.com/surmon-china>
 */

import { ControlValueAccessor } from '@angular/forms';
import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'sa-checkbox[ngModel]',
    templateUrl: './saCheckbox.component.html',
    styleUrls: ['./saCheckbox.component.scss'],
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SaCheckboxComponent),
        multi: true
      }
    ]
})
export class SaCheckboxComponent implements ControlValueAccessor {

  @Input() label: string;
  @Input() disabled: boolean;
  @Input() labelStrong: boolean;

  private innerValue: boolean;
  private onTouchedCallback: () => void = () => {};
  private onChangeCallback: (_: any) => void = () => {};

  constructor() {}

  get value(): any {
    return this.innerValue;
  }

  set value(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
      this.onChangeCallback(value);
    }
  }

  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}
