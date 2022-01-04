import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';
import { AlertController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-requetes',
  templateUrl: './requetes.page.html',
  styleUrls: ['./requetes.page.scss'],
})
export class RequetesPage implements OnInit {

  items: Observable<any[]>;
  nom: string;
  description: string;
  file: string;
  etat: boolean;
  addreq: boolean;
  user;
  idProprio;
  nameProprio;
  propName;
  authorName;

  // Variable pour ajout photo
  fileName;
  url;
  barStatus = false;
  imageUploads = [];


  constructor(
    public firestore: AngularFirestore,
    public data: DataService,
    public alertController: AlertController,
    private angularFireStorage: AngularFireStorage
  ) {
   this.items = this.firestore.collection('requetes').valueChanges();
   }

  ngOnInit() {
    this.getInfo();
  }

    public  async  getInfo() {
    const bien = await firebase.firestore().collection('biens').doc(this.data.docId)
    .get().then(( ref => ref.data()));
    const propName = await firebase.firestore().collection('users').doc(bien.moi)
    .get().then(( ref => ref.data()));
    const author = await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
    .get().then(( ref => ref.data()));
    this.propName = bien.name;
    this.idProprio = bien.moi;
    this.nameProprio = propName.name + ' ' + propName.prenom;
    this.authorName = author.name + ' ' + author.prenom;
    }

  addRequete(){
    this.firestore.collection('requetes').add({
      nom: this.nom,
      description: this.description,
      etat: 'Nouveau',
      spaceRef: this.fileName,
      url: this.url,
      idBien: this.data.docId,
      auteur: firebase.auth().currentUser.uid,
      idProprio: this.idProprio,
      nameProprio: this.nameProprio,
      bienName: this.propName,
      authorName: this.authorName,
      crea: firebase.firestore.FieldValue.serverTimestamp(),
      deleted: false,
    });
    this.ajout();
   }

  async ajout(){
    const alert = await this.alertController.create({
      header: 'Requete ajoutée !',
      message: 'Votre requete a correctement été ajouté.',
      buttons: ['Continuer']
    });

    await alert.present();
  }


  ///////// Ajout photo //////////

  imageName() {
    const newTime = Math.floor(Date.now() / 1000);
    const name = Math.floor(Math.random() * 20) + newTime;
    return name;
}

  async storeImage(imageData: any) {
    try {
        const imageName = this.imageName();
        this.fileName = imageName;
        return new Promise((resolve, reject) => {
        const pictureRef = this.angularFireStorage.ref('requetes/' + imageName);
        pictureRef
        .put(imageData)
        // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
        .then(function() {
        pictureRef.getDownloadURL().subscribe((url: any) => {
        resolve(url);
        });
    })
    .catch((error) => {
        reject(error);
    });
    });
    } catch (e) {}
    }

    uploadPhoto(event) {
      this.barStatus = true;
      this.storeImage(event.target.files[0]).then(
          (res: any) => {
              if (res) {
                  this.url = res;
                  console.log(this.url);
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
