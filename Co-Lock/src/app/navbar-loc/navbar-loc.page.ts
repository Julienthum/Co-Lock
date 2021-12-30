import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { getAuth, signOut } from 'firebase/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
@Component({
  selector: 'app-navbar-loc',
  templateUrl: './navbar-loc.page.html',
  styleUrls: ['./navbar-loc.page.scss'],
})
export class NavbarLocPage implements OnInit {
compteur: number;
  constructor() { }

  ngOnInit() {
    this.count();
  }
  async  count(){
    firebase.firestore().collection('requetes')
     .where('auteur', '==', firebase.auth().currentUser.uid)
     .where('etat', '==', 'En cours')
.onSnapshot(querySnapshot => {
   this.compteur = querySnapshot.size;
  console.log('this compteur',this.compteur);

});
}
}
