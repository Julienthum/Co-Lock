import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular/';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import firebase from 'firebase/compat/app';
import 'firebase/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajoutbien',
  templateUrl: './ajoutbien.page.html',
  styleUrls: ['./ajoutbien.page.scss'],
})
export class AjoutbienPage implements OnInit {


  location = 'photoBien/';
  barStatus = false;
  url = '';
  imageUploads = [];
  fileName;

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
    image: '',
    code: '',
  };
  essaieForm: any;


  constructor(
    public firestore: AngularFirestore,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    public alertController: AlertController,
    public formBuilder: FormBuilder,
    private angularFireStorage: AngularFireStorage,
    private router: Router,
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
      image: '',
      code: '',
      spaceRef: '',
      });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Bien Ajouté !',
      message: 'Votre bien à correctement été ajouté.',
      buttons: [
        {text: 'Continuer',
        handler: () => {
        this.router.navigate(['/navbar/mesbiens']);
        }
      }]
    });

    await alert.present();
  };

  idGenerator(){
    let code = 0;
    let code2 = 1;
    const char ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let index=0;
    let id ='';

    code = Math.floor((Math.random() * 9000))+1000;
    code2=Math.floor((Math.random() * 9000))+1000;
    index=Math.floor(Math.random()*10);
    id ='LO-'+code+'-'+code2+'-'+char.charAt(index);
    return (id);
  }

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
    const image = this.url;
    const code = this.idGenerator();
    const deleted = false;
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
      code,
      spaceRef: this.fileName,
      deleted
    });

    console.log('ca marche');
  }

/////////////// Upload Image ////////////

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
}
