import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular/';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/auth';


@Component({
  selector: 'app-ajoutrequete',
  templateUrl: './ajoutrequete.page.html',
  styleUrls: ['./ajoutrequete.page.scss'],
})
export class AjoutrequetePage implements OnInit {
  users: Observable<any[]>;
  firebaseData = {
    nom: '',
    description: '',
    type: '',
    reference: '',
  
  };

  essaieForm: any;

  constructor(
    public firestore: AngularFirestore,
    public alertController: AlertController,
    public formBuilder: FormBuilder,) { 
    this.users = this.firestore.collection('requetes').valueChanges();
    }

    addFirebase(){
      this.firestore.collection('requetes').add(this.firebaseData);
    };
  

  ngOnInit() {

    this.essaieForm = this.formBuilder.group({

      nom: '',
      description: '',
      type: '',
      reference: '',
 
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



async addRequete(){ 
  const user = await firebase.auth().currentUser;
  const moi = user.uid;
  const nom = this.essaieForm.value.nom;
  const description = this.essaieForm.value.description;
  const type = this.essaieForm.value.type;
  const reference = this.essaieForm.value.reference;

  this.firestore.collection('biens').add({
    moi,
    nom,
    description,
    type,
    reference,
  
  });



  console.log('ca marche');
}
  

}
