import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import { getAuth, deleteUser } from 'firebase/auth';
import { doc } from 'rxfire/firestore';
import { updateDoc } from 'firebase/firestore';

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

@Injectable({
  providedIn: 'root'
})
export class DataService {

  location = 'documents/';
  activatedRoute: any;
  docId = '';

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

  public getRestoByKey(key) {
    return this.firestore
      .collection('biens')
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

  public getDocs(): Observable<Docs[]> {
    return this.firestore
      .collection<Docs>('documents', (ref) =>
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

}
