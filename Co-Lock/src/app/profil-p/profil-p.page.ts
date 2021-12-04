import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import firebase from 'firebase/compat/app';
import { getAuth, signOut } from 'firebase/auth';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profil-p',
  templateUrl: './profil-p.page.html',
  styleUrls: ['./profil-p.page.scss'],
})
export class ProfilPPage implements OnInit {

  erreur: string;
  users: Observable<any[]>;

  constructor(
    public firestore: AngularFirestore,
    public router: Router,
    private data: DataService
  ) {
    this.users = this.data.getUser();
  }

  ngOnInit() {
  }


  signOut(){
    const auth = getAuth();
    signOut(auth).then(() => {
      this.router.navigate(['home']);
    }).catch((error) => {
      this.erreur = 'Une erreur s\'est produite... Veillez réessayer';
    });
  }

}
