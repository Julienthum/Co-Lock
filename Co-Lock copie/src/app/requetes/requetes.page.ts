import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-requetes',
  templateUrl: './requetes.page.html',
  styleUrls: ['./requetes.page.scss'],
})
export class RequetesPage implements OnInit {

  items : Observable<any[]>;
  nom : string;
  description : string;
  etat:boolean;
  addreq:boolean;


  constructor(
    public firestore: AngularFirestore,
   
  ) {
   this.items = this.firestore.collection('requetes').valueChanges();
   }


   addRequete(){
    this.firestore.collection('requetes').add({
      nom: this.nom,
      description:this.description,
    

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
