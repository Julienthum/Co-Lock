import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-indexation',
  templateUrl: './indexation.page.html',
  styleUrls: ['./indexation.page.scss'],
})
export class IndexationPage implements OnInit {


  public result:number =null;
  public loyer:number =null;
  public indiceActuel:number =null;
  public indicePrecedent:number =null;
  public operation:boolean =false;
  public urlIndice:string="https://statbel.fgov.be/fr/themes/prix-la-consommation/indice-des-prix-la-consommation#figures";

  constructor() { }

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


}
