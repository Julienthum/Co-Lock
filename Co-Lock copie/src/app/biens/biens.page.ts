/* eslint-disable no-trailing-spaces */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-biens',
  templateUrl: './biens.page.html',
  styleUrls: ['./biens.page.scss'],
})
export class BiensPage implements OnInit {
  // eslint-disable-next-line max-len
  // je crée une varaibale pour pouvoir l'invoquer sur la page html et j'y insère le lie et meme chose pour la description ex:  <ion-img src="{{imageURL}}"></ion-img> et {{labelBien}}
  imageURL=' assets/house.png';
  labelBien='Bien immobilier numéro :';

  // Objet Litéral

  bienImmo = {

  imageURL:' assets/house.png',
  labelBien:'Bien immobilier numéro :',

  };


  //création d'une array pour la liste

  compteur=[1,2,3,4,5];

  // array d'objets

  listeBiens=[

    {
      imageURL:' assets/house.png',
      labelBien:'Bien immobilier numéro :',
    },
    {
      imageURL:' assets/house.png',
      labelBien:'Bien immobilier numéro :',
    },
    {
      imageURL:' assets/house.png',
      labelBien:'Bien immobilier numéro :',
    },
    {
      imageURL:' assets/house.png',
      labelBien:'Bien immobilier numéro :',
    },
    {
      imageURL:' assets/house.png',
      labelBien:'Bien immobilier numéro :',
    },

  ];

  constructor() { }

  ngOnInit() {
  }

}
