import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';
import { AlertController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  type;

  reqForm: FormGroup;
  isSubmitted = false;

  // Variable pour ajout photo
  fileName;
  url;
  barStatus = false;
  imageUploads = [];


  constructor(
    public firestore: AngularFirestore,
    public data: DataService,
    public alertController: AlertController,
    private angularFireStorage: AngularFireStorage,
    public formBuilder: FormBuilder,
    private router: Router
  ) {
   this.items = this.firestore.collection('requetes').valueChanges();
   }

  ngOnInit() {
    this.getInfo();
    this.reqForm = this.formBuilder.group({
      nom: ['', [Validators.required]],
      description: ['', [Validators.required]],
      file: [''],
      perso: [true],

      });
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
    this.type = author.type;
    }

    get errorControl() {
      return this.reqForm.controls;
    }

    async presentNegative() {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Oops !',
        message: 'Vous avez oublié certains champs obligatoires !',
        buttons: ['Continuer']
      });

      await alert.present();
    };

  addRequete(){
    this.isSubmitted = true;
    if (!this.reqForm.valid) {
      console.log('manques des champs la!');
      this.presentNegative();
      return false;
    } else {
      console.log('ca marche');
      this.ajout();
      this.firestore.collection('requetes').add({
        nom: this.reqForm.value.nom,
        description: this.reqForm.value.description,
        file: this.reqForm.value.file,
        etat: 'Nouveau',
        idBien: this.data.docId,
        auteur: firebase.auth().currentUser.uid,
        idProprio: this.idProprio,
        nameProprio: this.nameProprio,
        bienName: this.propName,
        authorName: this.authorName,
        crea: firebase.firestore.FieldValue.serverTimestamp(),
        deleted: false,
        url: this.url,
        spaceRef: this.fileName,
        perso: this.reqForm.value.perso
      });
    }
   }

  async ajout(){
    if(this.reqForm.value.perso === true){
    const alert = await this.alertController.create({
      header: 'Reminder ajoutée !',
      message: 'Votre reminder a correctement été ajouté.',
      buttons: [
        { text: 'Continuer',
          handler: () => {
            this.router.navigate(['/monbien/' + this.data.docId]);
          }
        },
        ]
    });

    await alert.present();
  }
  else{
    const alert = await this.alertController.create({
      header: 'Requete ajoutée !',
      message: 'Votre requete a correctement été ajouté.',
      buttons: [
        { text: 'Continuer',
          handler: () => {
            this.router.navigate(['./monbien/' + this.data.docId]);
          }
        },
        ]
    });

    await alert.present();
  }
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
