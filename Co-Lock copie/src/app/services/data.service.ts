import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collectionData } from 'rxfire/firestore';
import { collection } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { };

}
