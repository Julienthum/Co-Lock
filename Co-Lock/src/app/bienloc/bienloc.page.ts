import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { map } from 'rxjs/operators';



export interface Biens {
  name: string;
  rue: string;
  numero: number;
  zip: number;
  ville: string;
  province: string;
  pays: string;
  superficie: number;
  prix: number;
  place: number;
  image: string;
  moi: string;
  code: string;
  cp: number;
  description: string;
}
export interface Docs {
  name: string;
  url: number;
  description: string;
}

export interface Id {
  id: any;
}

@Component({
  selector: 'app-bienloc',
  templateUrl: './bienloc.page.html',
  styleUrls: ['./bienloc.page.scss'],
})
export class BienlocPage implements OnInit {

  biens: Observable<any[]>;

  erreur: string;

  bien;
  code;

  docs: Observable<any[]>;
  req: Observable<any[]>;


  constructor(
    private data: DataService,
    public firestore: AngularFirestore,
    public router: Router,
  ) {}

   async ngOnInit() { // normalement ne pas mettre de async ici mais blc
    //this.getTest().subscribe((res) => (this.bien = res)); marche pas
    this.code = await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
    .get().then(( doc => doc.data().code));
    this.biens = this.getBien(this.code); //ca marche a  1OO% je suis trop fort
    console.log(this.ptsh());

  }

  ptsh(){
    firebase.firestore().collection('biens')
      .where('code', '==', this.code)
      .get()
      .then(querySnapshot => { if (querySnapshot.size === 1) {
        const snap = querySnapshot.docs[0];
        this.docs = this.getDocs(snap.ref.id);
        this.req = this.getReq(snap.ref.id);
        this.data.idBien = snap.ref.id;
    }
    else {
        console.log('query result in exactly one document');
    } });
  }


  getBien(code) {
    return this.firestore
      .collection<Biens>('biens', (ref) => ref
        .where('code', '==', code)
      )
      .snapshotChanges()
      .pipe(
        map((actions) => actions.map((a) =>  {
            const data = a.payload.doc.data() as Biens;
            const id = a.payload.doc.id;
            return {id, ...data};
        })
        )
      );
  }

  getDocs(test) {
    return this.firestore
      .collection<Docs>('documents', (ref) =>
        ref
          .where('idBien', '==', test)
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Docs;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  getReq(test) {
    return this.firestore
      .collection<Docs>('requetes', (ref) =>
        ref
          .where('idBien', '==', test)
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Docs;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }


  lien(url){
    window.open(url, '_system');
  }

}
