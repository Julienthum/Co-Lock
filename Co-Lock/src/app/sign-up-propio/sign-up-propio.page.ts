import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AuthModule, getAuth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';




@Component({
  selector: 'app-sign-up-propio',
  templateUrl: './sign-up-propio.page.html',
  styleUrls: ['./sign-up-propio.page.scss'],
})
export class SignUpPropioPage implements OnInit {

  name: string;
  surname: string;
  email: string;
  password: string;
  tel: string;
  state: 'propriétaire';
  essaieForm: FormGroup;
  mobile: string;




  constructor(public formBuilder: FormBuilder,
    public firestore: AngularFirestore,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    public auth: AngularFireAuth) { }

  ngOnInit() {
    this.essaieForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(5)]]

    });
  }

  login(){
    createUserWithEmailAndPassword(auth, this.email, this.password).then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
    console.log('Bienvenue', this.name, 'vous etes bien inscrit.');
    }

    signupTable(value){
      // eslint-disable-next-line arrow-body-style
      const user = this.auth.createUserWithEmailAndPassword(value.email, value.password).then(cred => {
        return this.firestore.collection('users').doc(cred.user.uid).set(value);
        });
        return { user };
    }

}


const auth = getAuth();
