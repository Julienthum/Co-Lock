import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import firebase from 'firebase/compat/app';
import { getAuth, signOut } from 'firebase/auth';
import { DataService } from '../services/data.service';
import { Observable, } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Prop {
  name: string;
  prenom: string;
  email: string;
  tel: number;
}

@Component({
  selector: 'app-profil-l',
  templateUrl: './profil-l.page.html',
  styleUrls: ['./profil-l.page.scss'],
})


export class ProfilLPage implements OnInit {

  erreur: string;
  users: Observable<any[]>;
  prop: Observable<any[]>;

  constructor(
    public firestore: AngularFirestore,
    public router: Router,
    private data: DataService,
  ) {
    this.users = this.data.getUser();
  }

  async ngOnInit() {
    this.prop = await this.getTest();
  }

  signOut(){
    const auth = getAuth();
    signOut(auth).then(() => {
      this.router.navigate(['home']);
    }).catch((error) => {
      this.erreur = 'Une erreur s\'est produite... Veillez réessayer';
    });
  }

  deleteUser(){
    this.data.deleteUser();
    this.data.deleteItem('users', firebase.auth().currentUser.uid);
  }


  public  async  getTest() {//nice
    const jay = await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
    .get().then(( doc => doc.data().code));
    return this.firestore
      .collection<Prop>('users', (ref) => ref
        .where('email', '==', 'alban.vb@hotmail.com')
      )
      .snapshotChanges()
      .pipe(
        map((actions) => actions.map((a) => a.payload.doc.data() as Prop)
        )
      );
  }

}
