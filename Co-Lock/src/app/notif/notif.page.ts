import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';

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

  newReqs: Observable<any[]>;
  inprogressReqs: Observable<any[]>;
  finishReqs: Observable<any[]>;

  constructor(
    private firestore: AngularFirestore,
    private data: DataService,
  ) { }

  ngOnInit() {
    this.newReqs = this.data.getReq('Nouveau');
    this.inprogressReqs = this.data.getReq('En cours');
    this.finishReqs = this.data.getReq('Terminée');
  }
}
