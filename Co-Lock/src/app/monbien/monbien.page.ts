import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Share } from '@capacitor/share';


@Component({
  selector: 'app-monbien',
  templateUrl: './monbien.page.html',
  styleUrls: ['./monbien.page.scss'],
})


export class MonbienPage implements OnInit {

  docs: Observable<any[]>;
  newReqs: Observable<any[]>;
  inprogressReqs: Observable<any[]>;
  finishReqs: Observable<any[]>;

  loc: Observable<any[]>;

  bien;
  idBien;


  constructor(
    public firestore: AngularFirestore,
    private activatedRoute: ActivatedRoute,
    private data: DataService,
  ) { }

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.data.getRestoByKey(id).subscribe((res) => (this.bien = res));
    this.data.getDocId(id);
    this.docs = this.data.getDocs('documents');
    this.newReqs = this.data.getReq('Nouveau');
    this.inprogressReqs = this.data.getReq('En cours');
    this.finishReqs = this.data.getReq('Terminée');
    const code = await firebase.firestore().collection('biens').doc(id)
    .get().then(( doc => doc.data().code));
    this.loc = this.data.getLoc(code);
  }

  deleteResto() {
    this.data.deleteItem('biens', this.bien.id);
  }

  async share(){
    await Share.share({
      title: 'Acces bien',
      text: 'Voici le code pour accéder à l\'application CO-LOCK ' + this.bien.code,
    });
  }

  lien(url){
    window.open(url, '_system');
  }
}
