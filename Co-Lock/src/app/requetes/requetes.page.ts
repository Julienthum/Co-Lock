import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';

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
      auteur: firebase.auth().currentUser.uid
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
  }

}
