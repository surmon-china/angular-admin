/**
 * @file 密码对比验证器
 * @desc app/validators/EqualPasswords
 * @author Surmon <https://github.com/surmon-china>
 */

import { FormGroup } from '@angular/forms';

export class EqualPasswordsValidator {

  public static validate(firstField, secondField) {
    return (context: FormGroup) => {
      return (
        context.controls &&
        context.controls[firstField].value === context.controls[secondField].value
      ) ? null : {
        passwordsEqual: {
          valid: false
        }
      };
    };
  }
}
