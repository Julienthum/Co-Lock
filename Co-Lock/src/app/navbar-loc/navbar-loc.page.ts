import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { getAuth, signOut } from 'firebase/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-navbar-loc',
  templateUrl: './navbar-loc.page.html',
  styleUrls: ['./navbar-loc.page.scss'],
})
export class NavbarLocPage implements OnInit {
compteur: number;
users: Observable<any[]>;

  constructor( private data: DataService,
    ) {this.users = this.data.getUser();
  }

  ngOnInit() {
    this.count();
  }
  async  count(){
    firebase.firestore().collection('requetes')
     .where('auteur', '==', firebase.auth().currentUser.uid)
     .where('etat', '==', 'En cours').where('deleted', '==', false)
.onSnapshot(querySnapshot => {
   this.compteur = querySnapshot.size;
  console.log('this compteur',this.compteur);

});
}
}
