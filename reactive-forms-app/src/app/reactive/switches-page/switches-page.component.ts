import { JsonPipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../utils/form.util';

@Component({
  selector: 'app-switches-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './switches-page.component.html',
  styleUrl: './switches-page.component.css',
})
export class SwitchesPageComponent {
  private fb = inject(FormBuilder);

  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [true],
    termAndConditions: [false, Validators.requiredTrue],
  });

  onSubmit() {
    this.myForm.markAllAsTouched();
    console.log(this.myForm.value);
  }
}
