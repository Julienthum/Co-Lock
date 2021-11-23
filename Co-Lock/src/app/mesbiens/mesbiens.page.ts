import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mesbiens',
  templateUrl: './mesbiens.page.html',
  styleUrls: ['./mesbiens.page.scss'],
})
export class MesbiensPage implements OnInit {
  biens: Observable<any[]>;

  constructor(
    public firestore: AngularFirestore,
  ) {
    this.biens = this.firestore.collection('biens').valueChanges();
  }


  ngOnInit() {
  }

}
