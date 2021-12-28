import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';
import { getFirestore } from 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';

@Component({
  selector: 'app-requetes',
  templateUrl: './requetes.page.html',
  styleUrls: ['./requetes.page.scss'],
})
export class RequetesPage implements OnInit {

  items: Observable<any[]>;
  nom: string;
  description: string;
  etat: boolean;
  addreq: boolean;
  user;
  idProprio;
  nameProprio;
  bienName;


  constructor(
    public firestore: AngularFirestore,
    public data: DataService,
  ) {
   this.items = this.firestore.collection('requetes').valueChanges();
   }


   addRequete(){
    this.firestore.collection('requetes').add({
      nom: this.nom,
      description: this.description,
      etat: 'Nouveau',
      idBien: this.data.docId,
      auteur: firebase.auth().currentUser.uid,
      idProprio: this.idProprio,
      nameProprio: this.nameProprio,
      bienName: this.bienName,
      crea: firebase.firestore.FieldValue.serverTimestamp()
    });
//ces deux lignes permettent de vider le champ après chaque ajout
    this.nom ='';
    this.description='';
   }


   showFormulaire(){
     this.addreq=!this.addreq;
     this.nom ='';
     this.description='';
   }

  ngOnInit() {
    this.getInfo();
  }

    public  async  getInfo() {
    const bien = await firebase.firestore().collection('biens').doc(this.data.docId)
    .get().then(( ref => ref.data()));
    const userName = await firebase.firestore().collection('users').doc(bien.moi)
    .get().then(( ref => ref.data()));
    this.bienName = bien.name;
    this.idProprio = bien.moi;
    this.nameProprio = userName.name + ' ' + userName.prenom;
  }


}
