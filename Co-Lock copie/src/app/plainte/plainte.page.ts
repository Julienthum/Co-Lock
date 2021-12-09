import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-plainte',
  templateUrl: './plainte.page.html',
  styleUrls: ['./plainte.page.scss'],
})
export class PlaintePage implements OnInit {

  items: Observable<any[]>;

  constructor(
    public firestore: AngularFirestore,
   
  ) {
   this.items = this.firestore.collection('requetes').valueChanges();
   }

  ngOnInit() {
  }

}
