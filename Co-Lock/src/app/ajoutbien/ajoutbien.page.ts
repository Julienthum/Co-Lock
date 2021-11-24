import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular/';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/auth';

@Component({
  selector: 'app-ajoutbien',
  templateUrl: './ajoutbien.page.html',
  styleUrls: ['./ajoutbien.page.scss'],
})
export class AjoutbienPage implements OnInit {

  users: Observable<any[]>;
  firebaseData = {
    nomDuBien: '',
    description: '',
    rue: '',
    numero: '',
    ville: '',
    codepostal: '',
    province: '',
    superficie: '',
    nbrePlace: '',
    prix: '',
    image: ''
  };
  essaieForm: any;


  constructor(
    public firestore: AngularFirestore,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    public alertController: AlertController,
    public formBuilder: FormBuilder,
  ) {
    this.users = this.firestore.collection('biens').valueChanges();
  }

  addFirebase(){
    this.firestore.collection('biens').add(this.firebaseData);
  };

  ngOnInit() {
    this.essaieForm = this.formBuilder.group({
      nomDuBien: '',
      description: '',
      rue: '',
      numero: '',
      ville: '',
      codepostal: '',
      province: '',
      superficie: '',
      nbrePlace: '',
      prix: '',
      image: ''
      });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Bien Ajouté !',
      message: 'Votre bien à correctement été ajouté.',
      buttons: ['Continuer']
    });

    await alert.present();
  };

  async addMike(){ // ca ajoute un bien dans la collec biens et ca ajoute aussi l'uid dans les champs
    const user = await firebase.auth().currentUser;
    const moi = user.uid;
    const name = this.essaieForm.value.nomDuBien;
    const description = this.essaieForm.value.description;
    const rue = this.essaieForm.value.rue;
    const numero = this.essaieForm.value.numero;
    const ville = this.essaieForm.value.ville;
    const cp = this.essaieForm.value.codepostal;
    const province = this.essaieForm.value.province;
    const superficie = this.essaieForm.value.superficie;
    const nbrePlace = this.essaieForm.value.nbrePlace;
    const prix = this.essaieForm.value.prix;
    const image = this.essaieForm.value.image;
    this.firestore.collection('biens').add({
      moi,
      name,
      description,
      rue,
      numero,
      ville,
      cp,
      province,
      superficie,
      nbrePlace,
      prix,
      image,
    });

    console.log('ca marche');
  }

}
