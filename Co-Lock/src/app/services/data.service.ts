import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/auth';

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
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  location = 'documents/';

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

}
