import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import firebase from 'firebase/compat/app';
import 'firebase/auth';

@Component({
  selector: 'app-mesbiens',
  templateUrl: './mesbiens.page.html',
  styleUrls: ['./mesbiens.page.scss'],
})
export class MesbiensPage implements OnInit {
  biens: Observable<any[]>;
  query: true;

  constructor(
    public firestore: AngularFirestore,
  ) {

  }


  ngOnInit() {
    const id = firebase.auth().currentUser.uid;
    const biens = this.firestore.collection('biens');
    const query = biens.ref.where('moi', '==', id);
    if(query){
      console.log(id);
      this.biens = this.firestore.collection('biens',  (ref) =>
        ref.where('moi', '==', id)).valueChanges();
    } else {
      console.log('ca marche bien ');
  }
  }
}
