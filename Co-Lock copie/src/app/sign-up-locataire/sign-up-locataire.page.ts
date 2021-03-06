import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-sign-up-locataire',
  templateUrl: './sign-up-locataire.page.html',
  styleUrls: ['./sign-up-locataire.page.scss'],
})
export class SignUpLocatairePage implements OnInit {

  name: string;
  surname: string;
  email: string;
  password: string;
  tel: string;
  state: 'propriétaire';
  essaieForm: FormGroup;
  mobile: string;

  constructor(
    public formBuilder: FormBuilder,
    public firestore: AngularFirestore,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    public auth: AngularFireAuth
    ) { }

  ngOnInit() {
    this.essaieForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      code: ['', [Validators.required, Validators.minLength(2)]]

    });
  }

  login(value){
    // eslint-disable-next-line max-len
    const user = this.auth.createUserWithEmailAndPassword(value.email, value.password).then(cred => this.firestore.collection('users').doc(cred.user.uid).set(value));
    return { user };
    }
};
