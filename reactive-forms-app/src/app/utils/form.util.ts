import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

async function sleep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 3000);
  });
}

export class FormUtils {
  //expresiones regulares
  static namePattern = '^([a-zA-Z]+) ([a-zA-Z]+)$';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return form.controls[fieldName].errors && form.controls[fieldName].touched;
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};

    for (const key of Object.keys(errors)) {
      console.log('key', key);

      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres`;

        case 'min':
          return `Valor mínimo de ${errors['min'].min}`;

        case 'email':
          return `Correo con formato incorrecto`;

        case 'emailTaken':
          return `Correo ya registrado`;

        case 'notStrider':
          return `Nombre de usuario no permitido`;

        case 'pattern':
          if (errors['pattern'].requiredPattern === FormUtils.emailPattern) {
            return 'El correo electrónico no es permitido';
          }
          return 'Error de patrón contra expresión regular';

        default:
          return `Error de validación no controlado ${key}`;
      }
    }

    return null;
  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  static getFieldArrayError(
    formArray: FormArray,
    index: number,
  ): string | null {
    if (!formArray.controls[index]) return null;

    const errors = formArray.controls[index].errors ?? {};

    for (const key of Object.keys(errors)) {
      console.log('key', key);

      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres`;

        case 'min':
          return `Valor mínimo de ${errors['min'].min}`;
      }
    }

    return null;
  }

  static isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl) => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;

      return field1Value === field2Value ? null : { passwordsNotEqual: true };
    };
  }

  static async checkingServerResponse(
    control: AbstractControl,
  ): Promise<ValidationErrors | null> {
    console.log('validando servidor');

    await sleep();

    const formValue = control.value;

    console.log(formValue);

    if (formValue === 'hola@mundo.com') {
      return {
        emailTaken: true,
      };
    }
    return null;
  }

  static notStrider(control: AbstractControl): ValidationErrors | null {
    const value: string = (control.value ?? '').trim().toLowerCase();
    console.log(value);

    if (value === 'strider') {
      console.log('El nombre de usuario no puede ser "strider"');
      return {
        notStrider: true,
      };
    }
    return null;
  }
}
