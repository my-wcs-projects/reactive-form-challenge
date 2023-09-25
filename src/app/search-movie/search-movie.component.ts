import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieSearch } from './movie-search.model';

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.css'],
})
export class SearchMovieComponent implements OnInit {
  searchForm!: FormGroup;
  currentYear: number = new Date().getFullYear();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group(
      {
        identifier: [''],
        title: [''],
        type: ['séries'],
        releaseYear: [
          '',
          [
            Validators.required,
            this.rangeDateValidator(1900, this.currentYear),
          ],
        ],
        sheet: ['courte'],
      },
      { validators: this.isRequiredValidator }
    );
  }

  // Fonction de validation personnalisée pour vérifier si au moins un des champs 'Identifier' ou 'Title' est requis
  isRequiredValidator(group: FormGroup) {
    const identifier = group.get('identifier')?.value;
    const title = group.get('title')?.value;

    if (!identifier && !title) {
      return { isRequired: true };
    }

    return null;
  }

  // Fonction de validation personnalisée pour vérifier la plage de l'Année de sortie
  rangeDateValidator(minYear: number, maxYear: number) {
    return (control: any) => {
      const year = control.value;
      if (year < minYear || year > maxYear) {
        return { min: { minYear, maxYear } };
      }
      return null;
    };
  }

  // Méthode appelée lorsque le formulaire est soumis
  onSubmit() {
    if (this.searchForm.valid) {
      const formData = this.searchForm.value;
      console.log('Formulaire soumis :', formData);
    }
  }
}
