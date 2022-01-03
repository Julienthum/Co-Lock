import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';
import firebase from 'firebase/compat/app';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getAuth, updateEmail, updatePassword } from 'firebase/auth';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/compat/storage';


const auth = getAuth();

@Component({
  selector: 'app-profilinfo',
  templateUrl: './profilinfo.page.html',
  styleUrls: ['./profilinfo.page.scss'],
})
export class ProfilinfoPage implements OnInit {

  users: Observable<any[]>;
  essaieForm: FormGroup;
  location = 'photoID/';
  barStatus = false;
  url = '';
  imageUploads = [];
  fileName;

  constructor(
    public formBuilder: FormBuilder,
    public firestore: AngularFirestore,
    public router: Router,
    private data: DataService,
    public alertController: AlertController,
    private angularFireStorage: AngularFireStorage,
    public actionSheetController: ActionSheetController

    ) {
    this.users = this.data.getUser();
  }

  ngOnInit() {
    this.essaieForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(10)]],
      email: [],
      password: [],
      code: [],
    });
  }

  uptadeInfo(){
    const newItem = {
      name :  this.essaieForm.value.name,
      prenom : this.essaieForm.value.prenom,
      mobile :  this.essaieForm.value.mobile,
    };
    this.data.updateItem('users', firebase.auth().currentUser.uid, newItem );
  }

  async handleButtonClick(test) {
    const actionSheet = await this.actionSheetController.create({
      header: test,
      buttons: [
        { text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.updateCode();

          }
      },
        { text: 'Cancel', role: 'cancel',
        handler: () => {
          console.log('Cancel');

        } },
      ],
    });

    await actionSheet.present();
  }

  updateCode(){
    const newItem = {
      code :  this.essaieForm.value.code,
    };
    this.data.updateItem('users', firebase.auth().currentUser.uid, newItem );
  }

  updateEmail(){
    updateEmail(auth.currentUser, this.essaieForm.value.email).then(() => {
      const newmail = {
        email : this.essaieForm.value.email
      };
      this.data.updateItem('users', firebase.auth().currentUser.uid, newmail );
    }).catch((error) => {
      alert( 'Une erreur s\'est produite...');
    });
  }

  updatePassword(){
    updatePassword(auth.currentUser, this.essaieForm.value.password).then(() => {
      const newpassword = {
        password : this.essaieForm.value.password
      };
      this.data.updateItem('users', firebase.auth().currentUser.uid, newpassword );
      console.log('password updated');
    }).catch((error) => {
      alert( 'Une erreur s\'est produite...');
    });
  }


  async presentAlertConfirmEmail() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Attention',
      // eslint-disable-next-line max-len
      message: 'Vous etes sur le point de modifier l\'un de vos identifiant de connexion. Etes vous sur de vouloir continuer ? Une fois cette action effectué vous devrez vous reconnecter.',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmer',
          handler: (value: any) => {
            this.updateEmail();
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertConfirmPassword() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Attention',
      // eslint-disable-next-line max-len
      message: 'Vous etes sur le point de modifier l\'un de vos identifiant de connexion. Etes vous sur de vouloir continuer. ',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmer',
          handler: (value: any) => {
            this.updatePassword();
          }
        }
      ]
    });
    await alert.present();
  }

///// PHOTO DE PROFIL /////

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

      async addMike(){ // ca ajoute un bien dans la collec biens et ca ajoute aussi l'uid dans les champs
        const photoURL = {
          spaceRef: this.fileName,
          photo : this.url
        };
        this.data.updateItem('users', firebase.auth().currentUser.uid, photoURL );
      }


}
