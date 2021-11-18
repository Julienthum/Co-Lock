import { Component, OnInit } from '@angular/core';
import { AuthModule, getAuth, createUserWithEmailAndPassword } from '@angular/fire/auth';

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
  code: string;
  state: 'locataire';


  constructor() { }

  ngOnInit() {
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

}

const auth = getAuth();
