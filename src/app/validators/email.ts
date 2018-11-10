/**
 * @file 邮件验证器
 * @module app/validators/email
 * @author Surmon <https://github.com/surmon-china>
 */

import { AbstractControl } from '@angular/forms';

export class EmailValidator {

  public static validate(c: AbstractControl) {
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    return EMAIL_REGEXP.test(c.value) ? null : {
      validateEmail: {
        valid: false
      }
    };
  }
}
