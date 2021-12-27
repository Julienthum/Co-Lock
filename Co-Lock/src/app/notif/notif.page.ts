import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Req {
  name: string;
  description: string;
  etat: number;
  idBien: string;
  auteur: string;
}

@Component({
  selector: 'app-notif',
  templateUrl: './notif.page.html',
  styleUrls: ['./notif.page.scss'],
})
export class NotifPage implements OnInit {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  ngOnInit() {
  }
}
