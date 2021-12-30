import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-notifloc',
  templateUrl: './notifloc.page.html',
  styleUrls: ['./notifloc.page.scss'],
})
export class NotiflocPage implements OnInit {

  newReqL: Observable<any[]>;
  inprogressReqL: Observable<any[]>;
  finishReqL: Observable<any[]>;

  constructor(
    private firestore: AngularFirestore,
    private data: DataService,
  ) { }

  ngOnInit() {
    console.log(this.data.docId);
    this.newReqL = this.data.getReqL('Nouveau');
    this.inprogressReqL = this.data.getReqL('En cours');
    this.finishReqL = this.data.getReqL('Terminée');
  }

}
