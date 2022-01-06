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

  newRem: Observable<any[]>;
  inprogressRem: Observable<any[]>;
  finishRem: Observable<any[]>;

  constructor(
    private firestore: AngularFirestore,
    private data: DataService,
  ) { }

  ngOnInit() {
    this.newReqs = this.data.getReq('Nouveau');
    this.inprogressReqs = this.data.getReq('En cours');
    this.finishReqs = this.data.getReq('Terminée');
    this.newRem = this.data.getAllRem('Nouveau');
    this.inprogressRem = this.data.getAllRem('En cours');
    this.finishRem = this.data.getAllRem('Terminée');
  }
}
