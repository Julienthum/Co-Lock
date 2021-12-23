import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import firebase from 'firebase/compat/app';
import { getAuth, signOut } from 'firebase/auth';

@Component({
  selector: 'app-profil-p',
  templateUrl: './profil-p.page.html',
  styleUrls: ['./profil-p.page.scss'],
})
export class ProfilPPage implements OnInit {

  erreur: string;

  indexation = {
    loyer:null,
    indiceActuel:null,
    indicePrecedent:null,
    result:null
  }

  public result:number =null;
  public loyer:number =null;
  public indiceActuel:number =null;
  public indicePrecedent:number =null;
  public operation:boolean =false;
  public urlIndice:string="https://statbel.fgov.be/fr/themes/prix-la-consommation/indice-des-prix-la-consommation#figures";


  constructor(
    public firestore: AngularFirestore,
    public router: Router,
  ) { }

  ngOnInit() {
  }


  calcul(){

    if (this.loyer==null || this.indiceActuel==null || this.indicePrecedent==null) {
      alert('Veuillez insérer toutes les données');
      this.result=null;
    }else { 
    this.result=(this.loyer*this.indiceActuel)/this.indicePrecedent;
    this.operation=true; 
    console.log(this.result);
    }
    
  }

  consulterIndices(){
    window.open(this.urlIndice);
  }

  signOut(){
    const auth = getAuth();
    signOut(auth).then(() => {
      this.router.navigate(['home']);
    }).catch((error) => {
      this.erreur = 'Une erreur s\'est produite... Veillez réessayer';
    });
  }

}
