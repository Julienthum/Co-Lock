import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-indexation',
  templateUrl: './indexation.page.html',
  styleUrls: ['./indexation.page.scss'],
})
export class IndexationPage implements OnInit {

  bien;
  id;

  result: number =null;
  loyer: number =null;
  indiceActuel: number =null;
  indicePrecedent: number =null;
  operation = false;
  newPrice = false;
  urlIndice = 'https://statbel.fgov.be/fr/themes/prix-la-consommation/indice-des-prix-la-consommation#figures';

  constructor(
    private activatedRoute: ActivatedRoute,
    private data: DataService
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.data.getRestoByKey(this.id).subscribe((res) => this.bien = res);
  }

  calcul(){
    this.loyer = this.bien.prix;
    if (this.loyer==null || this.indiceActuel==null || this.indicePrecedent==null) {
      alert('Veuillez insérer toutes les données');
      this.result=null;
    }else {
    this.result=(this.loyer*this.indiceActuel)/this.indicePrecedent;
    this.operation=true;
    console.log(this.result);
    this.newPrice = true;
    }
  }

  updatePrice(){
    const newItem = {
      prix : this.result
    };
    this.data.updateItem('biens', this.id, newItem);
    this.newPrice = false;
  }

  consulterIndices(){
    window.open(this.urlIndice);
  }


}
