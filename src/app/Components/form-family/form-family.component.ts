import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-family',
  templateUrl: './form-family.component.html',
  styleUrls: ['./form-family.component.less'],
})
export class FormFamilyComponent implements OnInit {
  film = this.fb.group({
    name: [''],
    director: [''],
    year: [''],
    isOscarOwner: [''],
  });

  person = this.fb.group({
    name: [''],
    lastname: [''],
    films: this.fb.array([]),
  });

  father = this.fb.group({
    data: this.person,
    childs: this.fb.array([]),
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.readForm();
  }

  readForm() {
    console.log(this.father.value);
  }

  addFilm() {
    const films = this.father.controls.data.controls.films as FormArray;
    films.push(
      this.fb.group({
        name: [''],
        director: [''],
        year: [''],
        isOscarOwner: [''],
      })
    );
  }

  removeFilm() {
    const films = this.father.controls.data.controls.films as FormArray;

    films.removeAt(films.controls.length - 1);
  }

  addChild() {
    const childs = this.father.controls.childs as FormArray;
    childs.push(
      this.fb.group({
        name: [''],
        lastname: [''],
        films: this.fb.array([]),
      })
    );
  }

  removeChild() {
    const childs = this.father.controls.childs as FormArray;
    childs.removeAt(childs.controls.length - 1);
  }

  addFilmInChild(i: number) {
    const childs = <FormArray>this.father.get('childs');
    const films = <FormArray>childs.controls[i].get('films');

    films.push(
      this.fb.group({
        name: [''],
        director: [''],
        year: [''],
        isOscarOwner: [''],
      })
    );
  }

  removeFilmInChild(i: number) {
    const childs = <FormArray>this.father.get('childs');
    const films = <FormArray>childs.controls[i].get('films');

    films.removeAt(films.controls.length - 1);
  }

  getFilmsByChild(i: number) {
    const childs = <FormArray>this.father.get('childs');
    const films = <FormArray>childs.controls[i].get('films');
    return films;
  }

  // addFilm() {
  //   this.person.controls.films.push(this.film);
  // }

  // removeFilm() {
  //   this.person.controls.films.removeAt(
  //     this.person.controls.films.controls.length - 1
  //   );
  // }

  // addChildren() {
  //   this.person.controls.childrens.push(this.child);
  // }

  // removeChildren() {
  //   this.person.controls.childrens.removeAt(
  //     this.person.controls.childrens.controls.length - 1
  //   );
  // }
}
