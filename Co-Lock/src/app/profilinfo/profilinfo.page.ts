import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';
import firebase from 'firebase/compat/app';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getAuth, updateEmail, updatePassword } from 'firebase/auth';
import { AlertController } from '@ionic/angular';

const auth = getAuth();

@Component({
  selector: 'app-profilinfo',
  templateUrl: './profilinfo.page.html',
  styleUrls: ['./profilinfo.page.scss'],
})
export class ProfilinfoPage implements OnInit {

  users: Observable<any[]>;
  essaieForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public firestore: AngularFirestore,
    public router: Router,
    private data: DataService,
    public alertController: AlertController
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


}
