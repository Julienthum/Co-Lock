/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular/';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { DataService } from '../services/data.service';
export interface Biens {
  name: string;
  rue: string;
  numero: number;
  zip: number;
  ville: string;
  province: string;
  pays: string;
  superficie: number;
  prix: number;
  place: number;
  image: string;
  moi: string;
  code: string;
}
@Component({
  selector: 'app-update-biens',
  templateUrl: './update-biens.page.html',
  styleUrls: ['./update-biens.page.scss'],
})
export class UpdateBiensPage implements OnInit {


  essaieForm: FormGroup;
  location = 'photoBien/';
  barStatus = false;
  url = '';
  imageUploads = [];
  bien;
  id: any;
  users: Observable<any[]>;
  spaceRef;


  constructor(public firestore: AngularFirestore,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    public alertController: AlertController,
    public formBuilder: FormBuilder,    private activatedRoute: ActivatedRoute,
    private data: DataService,    public router: Router,

    private angularFireStorage: AngularFireStorage) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.data.getRestoByKey(id).subscribe((res) => (this.bien = res));
      this.getTask(id).subscribe((dala) => {
        this.essaieForm = this.formBuilder.group({
          // eslint-disable-next-line @typescript-eslint/dot-notation
          ville: [dala['ville']],
          // eslint-disable-next-line @typescript-eslint/dot-notation
          superficie: [dala['superficie']],
          nomDuBien: [dala['nomDuBien']],
          description: [dala['description']],
          rue: [dala['rue']],
          numero: [dala['numero']],
          codepostal: [dala['codepostal']],
          province: [dala['province']],
          nbrePlace: [dala['nbrePlace']],
          prix: [dala['prix']],
          image: [dala['image']],
          code: [dala['code']],

        });
      });
    }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.data.getRestoByKey(id).subscribe((res) => (this.bien = res));
    this.users = this.data.getUser();
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
      image: '',
      code: '',
      });
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Bien Ajouté !',
      message: 'Votre bien à correctement été modifié.',
      buttons: ['Continuer']
    });

    await alert.present();
  };

  getTask(id) {
    return this.firestore.collection('biens').doc(id).valueChanges();
  }

  uptadeInfo(){
    const newItem = {
      nomDuBien :  this.essaieForm.value.nomDuBien,
      description : this.essaieForm.value.description,
      rue :  this.essaieForm.value.rue,
      numero :  this.essaieForm.value.numero,
      ville :  this.essaieForm.value.ville,
      codepostal :  this.essaieForm.value.codepostal,
      province :  this.essaieForm.value.province,
      superficie :  this.essaieForm.value.superficie,
      nbrePlace :  this.essaieForm.value.nbrePlace,
      prix :  this.essaieForm.value.prix,
      image :  this.essaieForm.value.image,
      code :  this.essaieForm.value.code,
    };
    this.data.updateItem('biens', this.bien.id, this.essaieForm.value );

  }


// Pour l'image ---------------------------------

imageName() {
  const newTime = Math.floor(Date.now() / 1000);
  const name = Math.floor(Math.random() * 20) + newTime;
  return name;
}

async storeImage(imageData: any) {
  try {
      const imageName = this.imageName();
      this.spaceRef = imageName;
      return new Promise((resolve, reject) => {
      const pictureRef = this.angularFireStorage.ref(this.location + imageName);
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

    async addMike(){
      this.data.deleteDoc('biens', this.bien.spaceRef);
      const photoURL = {
        image: this.url,
        spaceRef: this.spaceRef
      };
      this.data.updateItem('biens', this.bien.id, photoURL );
    }

}
