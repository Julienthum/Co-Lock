import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AuthModule, getAuth, createUserWithEmailAndPassword } from '@angular/fire/auth';

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
