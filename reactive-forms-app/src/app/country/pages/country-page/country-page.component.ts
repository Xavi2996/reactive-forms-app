import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.css',
})
export class CountryPageComponent {
  fb = inject(FormBuilder);
  countryService = inject(CountryService);

  regions = signal<string[]>(this.countryService.getRegions());
  countriesByRegion = signal<Country[]>([]);
  bordersByCountry = signal<string[]>([]);

  myForm = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
  }

  onFormChanged = effect((onCleanup) => {
    const regionSubscription = this.onRegionChanged();
    const countrySubscription = this.oncountryChanged();

    onCleanup(() => {
      regionSubscription?.unsubscribe();
      countrySubscription?.unsubscribe();
      console.log('limpiado');
    });
  });

  onRegionChanged() {
    return this.myForm
      .get('region')
      ?.valueChanges.pipe(
        tap(() => {
          this.myForm.get('country')?.reset('');
          this.myForm.get('border')?.reset('');
          this.bordersByCountry.set([]);
          this.countriesByRegion.set([]);
        }),
        switchMap((region) =>
          this.countryService.getCountriesByRegion(region ?? ''),
        ),
      )
      .subscribe((countries) => {
        this.countriesByRegion.set(countries);
        console.log(countries);
      });
  }

  oncountryChanged() {
    return this.myForm
      .get('country')
      ?.valueChanges.pipe(
        tap(() => {
          this.myForm.get('border')?.reset('');
          this.bordersByCountry.set([]);
        }),
        switchMap((alphaCode) =>
          this.countryService.getCountryByAlphaCode(alphaCode ?? ''),
        ),
      )
      .subscribe((country) => {
        this.countriesByAlphaCode(country?.borders!);
      });
  }

  countriesByAlphaCode(codes: string[]) {
    const borderSubscription = this.countryService
      .getCountriesBorderByCodes(codes)
      .subscribe((countries) =>
        this.bordersByCountry.set(countries.map((c) => c.name.common)),
      );
  }
}
