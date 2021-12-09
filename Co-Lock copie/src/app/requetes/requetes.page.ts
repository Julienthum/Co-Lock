import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { getAuth, signOut } from 'firebase/auth';
import { Router } from '@angular/router';

import firebase from 'firebase/compat/app';
import 'firebase/auth';

@Component({
  selector: 'app-requetes',
  templateUrl: './requetes.page.html',
  styleUrls: ['./requetes.page.scss'],
})
export class RequetesPage implements OnInit {

  requetes: Observable<any[]>;
  erreur: string;

  constructor( 

    public firestore: AngularFirestore,
    public router: Router,) { 
    
  }

  ngOnInit() {

    const id = firebase.auth().currentUser.uid;
    const requetes = this.firestore.collection('requêtes');
    const query = requetes.ref.where('reference', '==', id);
    if(query){
      console.log(id);
      this.requetes = this.firestore.collection('requêtes',  (ref) =>
        ref.where('reference', '==', id)).valueChanges();
    } else {
      console.log('ca marche bien ');
  }
  }

}
