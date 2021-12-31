import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore, validateEventsArray } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { observable, Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import { getAuth, deleteUser } from 'firebase/auth';
import { refEqual, updateDoc } from 'firebase/firestore';


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
}

export interface Users {
  name: string;
  email: string;
  mobile: number;
  prenom: string;
  type: string;
  code?: string;
}

export interface Docs {
  name: string;
  url: number;
  description: string;
}

export interface Req {
  nom: string;
  description: string;
  etat: string;
  idBien: string;
  auteur: string;
  idProprio: string;
  nameProprio: string;
  crea: Date;
  inprogress: Date;
  finish: Date;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  location = 'documents/';
  activatedRoute: any;
  docId = '';
  idBien;

  constructor(
    private firestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage,
    ) { };

/////////////////  Import d'image dans Storage  /////////////////////////

    imageName() {
      const newTime = Math.floor(Date.now() / 1000);
      const name = Math.floor(Math.random() * 20) + newTime;
      return name;
  }

    async storeImage(imageData: any) {
      try {
          const imageName = this.imageName();
          return new Promise((resolve, reject) => {
          const pictureRef = this.angularFireStorage.ref(this.location + imageName);
          pictureRef
          .put(imageData)
          // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
          .then(function() {
          pictureRef.getDownloadURL().subscribe((url: any) => {
          resolve(url);
          });
      })
      .catch((error) => {
          reject(error);
      });
      });
      } catch (e) {}
      }

/////////////////  Modification des documents  /////////////////////////

  public getUserByKey(key) {
    return this.firestore
      .collection('users')
      .doc(key)
      .valueChanges({ idField: 'id' });
  }

  public getRestoByKey(key) {
    return this.firestore
      .collection('biens')
      .doc(key)
      .valueChanges({ idField: 'id' });
   }
   public getDocByKey(key) {
    return this.firestore
      .collection('documents')
      .doc(key)
      .valueChanges({ idField: 'id' });
   }

   public getReqByKey(key) {
    return this.firestore
      .collection('requetes')
      .doc(key)
      .valueChanges({ idField: 'id' });
   }



// eslint-disable-next-line @typescript-eslint/member-ordering
nbrbien = 0;

   public getRestos(): Observable<Biens[]> {
    return this.firestore
      .collection<Biens>('biens', (ref) =>
        ref
          .where('moi', '==', firebase.auth().currentUser.uid)
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            this.nbrbien = this.nbrbien + 1;
            const data = a.payload.doc.data() as Biens;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  public deleteItem(collection, id) {
    return this.firestore.doc(collection + '/' + id).delete();
  }
  public updateItem(collection, id, newItem) {
    return this.firestore.collection(collection).doc(id).update(newItem);
  }

  public addItem(collection, object) {
    return this.firestore.collection(collection).add(object);
  }

  public deleteTest(collection) {
    return this.firestore.collection(collection, (ref) =>
    ref
      .where('idBien', '==', 'Z2wotlUie69EngfFt6er')
  ).doc().delete();
  }

  ///////////////// USER Managment //////////////////////


  public getUser(): Observable<Users[]> {
    return this.firestore
      .collection<Users>('users', (ref) =>
        ref
          .where('email', '==', firebase.auth().currentUser.email)
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Users;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  deleteUser(){
    const auth = getAuth();
    const user = auth.currentUser;

    deleteUser(user).then(() => {
      const action = 'Votre compte a bien été supprimé';
      alert(action);
    }).catch((error) => {
      const erreur = 'Une erreur s\'est produite... Veillez réessayer';
      alert(erreur);
    });
  }


  ///////////// Documents ID ///////////////

  getDocId(id){
    this.docId = id;
    console.log(this.docId);
  }

  public getDocs(doc): Observable<Docs[]> {
    return this.firestore
      .collection<Docs>(doc, (ref) =>
        ref
          .where('idBien', '==', this.docId)
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

  ////////// Requetes //////////

  public getReq(type): Observable<Req[]> {
    return this.firestore
      .collection<Req>('requetes', (ref) =>
        ref
          .where('idProprio', '==', firebase.auth().currentUser.uid)
          .where('etat', '==', type)
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Req;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  public getAllReqBiens(bien): Observable<Req[]> {
    return this.firestore
      .collection<Req>('requetes', (ref) =>
        ref
          .where('idBien', '==', bien)
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Req;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  public getReqBiens(type, bien): Observable<Req[]> {
    return this.firestore
      .collection<Req>('requetes', (ref) =>
        ref
          .where('idBien', '==', bien)
          .where('etat', '==', type)
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Req;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }


  public getReqL(type): Observable<Req[]> {
    return this.firestore
      .collection<Req>('requetes', (ref) =>
        ref
          .where('idBien', '==', this.idBien)
          .where('etat', '==', type)
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Req;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  ////////// Optenir les locataires ////////////

  public getLoc(code): Observable<Users[]> {
    return this.firestore
      .collection<Users>('users', (ref) =>
        ref
          .where('type', '==', 'L')
          .where('code', '==', code)
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Users;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

}
