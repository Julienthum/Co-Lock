/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular/';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import { DataService } from '../services/data.service';
import { getStorage, ref } from 'firebase/storage';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Component({
  selector: 'app-docbiens',
  templateUrl: './docbiens.page.html',
  styleUrls: ['./docbiens.page.scss'],
})

export class DocbiensPage implements OnInit {

  @Input() imageUpload: any;

  docs: Observable<any[]>;
  firebaseData = {
    name: '',
    description: '',
    doc: ''
  };
  essaieForm: any;


  constructor(
    public firestore: AngularFirestore,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    public alertController: AlertController,
    public formBuilder: FormBuilder,
    private dataService: DataService,
    private storage: AngularFireStorage
  ) {
    this.docs = this.firestore.collection('documents').valueChanges();
  }

  url = '';
  barStatus = false;
  imageUploads = [];

  ngOnInit(){
    this.essaieForm = this.formBuilder.group({
      name: '',
      description: '',
      doc: '',
      });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Document ajouté !',
      message: 'Votre document à correctement été ajouté.',
      buttons: ['Continuer']
    });
    await alert.present();
  }

  async addMike(){ // ca ajoute un bien dans la collec biens et ca ajoute aussi l'uid dans les champs
    const user = await firebase.auth().currentUser;
    const spaceRef = this.dataService.imageName();
    const moi = user.uid;
    const name = this.essaieForm.value.name;
    const description = this.essaieForm.value.description;
    const url = this.url;
    this.firestore.collection('documents').add({
      moi,
      name,
      description,
      spaceRef,
      url,
    });

    console.log('ca marche');
  }

  ///////////////

  uploadPhoto(event) {
    this.barStatus = true;
    this.dataService.storeImage(event.target.files[0]).then(
        (res: any) => {
            if (res) {
                this.url = res;
                this.imageUploads.unshift(res);
                this.barStatus = false;
        }
    },
    (error: any) => {
        this.barStatus = false;
    }
    );
    }

}
