import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DataService } from '../services/data.service';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up-propio',
  templateUrl: './sign-up-propio.page.html',
  styleUrls: ['./sign-up-propio.page.scss'],
})
export class SignUpPropioPage implements OnInit {

  essaieForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public firestore: AngularFirestore,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    public auth: AngularFireAuth,
    public router: Router,
    private data: DataService
    ) { }

  ngOnInit() {
    this.essaieForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      type: ['']

    });
    this.essaieForm.controls.type.setValue('P');

  }

  login(value){
    // eslint-disable-next-line max-len
    const user = this.auth.createUserWithEmailAndPassword(value.email, value.password).then(cred => this.firestore.collection('users').doc(cred.user.uid).set(value));
    this.router.navigate(['/login']);
    return { user };
    }
};
