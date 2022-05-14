import { Injectable } from '@angular/core';
import {
  FormGroup,
  FormControl
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormValidatorService {
  constructor() {}

  validateAllFormFields(formGroup: FormGroup) {

    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  validateAllErrorsFormFields(err:any , formGroup: FormGroup)
  {
  const validationErrors = err.response.data.errors;
  console.log(validationErrors)
  Object.keys(validationErrors).forEach(field => {
    const control = formGroup.get(field);
    if (control) {
      control.setErrors({
        serverError: validationErrors[field]
      });
      control.markAsTouched({ onlySelf: true });
    }
  });
   console.log(formGroup)
  }

}

