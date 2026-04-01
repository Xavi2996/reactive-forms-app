import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../utils/form.util';

@Component({
  selector: 'app-dinamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dinamic-page.component.html',
  styleUrl: './dinamic-page.component.css',
})
export class DinamicPageComponent {
  private fb = inject(FormBuilder);

  formUtils = FormUtils; //calase de utilidades para mensajes de errro de los fomrularios

  newFavorite = new FormControl('', Validators.required); //crear un control es mejor de esta forma por legibilidad
  // newFavorite = this.fb.control([])

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array(
      [
        ['Metal Gear', Validators.required],
        ['God Of war', Validators.required],
      ],
      Validators.minLength(2),
    ),
  });

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onAddToFavorites() {
    if (this.newFavorite.invalid) return;
    console.log('pasa');
    const newGame = this.newFavorite.value;

    this.favoriteGames.push(this.fb.control(newGame, Validators.required));

    this.newFavorite.reset();
  }

  onDeleteFavorites(index: number) {
    this.favoriteGames.removeAt(index);
  }

  onSave() {
    this.myForm.markAllAsTouched();
  }
}
