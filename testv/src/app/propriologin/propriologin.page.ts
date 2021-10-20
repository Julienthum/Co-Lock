import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-propriologin',
  templateUrl: './propriologin.page.html',
  styleUrls: ['./propriologin.page.scss'],
})
export class PropriologinPage implements OnInit {

  essaieForm: FormGroup;
  defaultDate = '1987-06-30';
  isSubmitted = false;

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {

    this.essaieForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  public submitForm() {
    this.isSubmitted = true;
    if (!this.essaieForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      console.log(this.essaieForm.value);
    }
  }

  get errorControl() {
    return this.essaieForm.controls;
  }

}
