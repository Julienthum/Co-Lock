/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { AuthModule, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, user } from '@angular/fire/auth';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  erreur: string;

  constructor(
    public router: Router,
  ) {};

  ngOnInit(){
  };

  email: string;
  password: string;

  signIn(){
    signInWithEmailAndPassword(auth, this.email, this.password).then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      this.router.navigate(['mesbiens']);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      this.erreur = errorMessage;
      if(errorMessage === 'Firebase: Error (auth/user-not-found).'){
        return (this.erreur = 'Email inconnu');
      }
      if(errorMessage === 'Firebase: Error (auth/wrong-password).'){
        return (this.erreur = 'Mot de passe incorrect');
      }
      // eslint-disable-next-line max-len
      if(errorMessage === 'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).'){
        // eslint-disable-next-line max-len
        return (this.erreur = 'L\'accès à ce compte a été temporairement désactivé en raison de nombreuses tentatives de connexion infructueuses. Vous pouvez le rétablir immédiatement en réinitialisant votre mot de passe ou vous pouvez réessayer plus tard.');
      }
      if(errorMessage === 'Firebase: Error (auth/missing-email).'){
        return (this.erreur = 'Veillez entrer un email et un mot de passe');
      }
      else{
        return(this.erreur = 'Une erreur s\'est produite');
      }

    });
  }
};

const auth = getAuth();
