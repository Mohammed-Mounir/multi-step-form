import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { phone } from 'phone';

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const phoneNumber = control.value.startsWith('+')
      ? control.value
      : `+${control.value}`;
    const phoneValidationResult = phone(phoneNumber);
    return phoneValidationResult.isValid ? null : { invalidPhone: true };
  };
}
