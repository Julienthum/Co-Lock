import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { getAuth, signOut } from 'firebase/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.page.html',
  styleUrls: ['./navbar.page.scss'],
})


export class NavbarPage implements OnInit {
  compteur: number;

  constructor(
    public firestore: AngularFirestore,
    public router: Router,
  ) { }

  ngOnInit() {
    this.count();
  }
  async  count(){
    firebase.firestore().collection('requetes')
     .where('idProprio', '==', firebase.auth().currentUser.uid)
     .where('etat', '==', 'Nouveau').where('deleted', '==', false)
.onSnapshot(querySnapshot => {
   this.compteur = querySnapshot.size;
  console.log('this compteur',this.compteur);

});
}
}

