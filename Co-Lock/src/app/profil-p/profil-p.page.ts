import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import firebase from 'firebase/compat/app';
import { getAuth, signOut } from 'firebase/auth';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profil-p',
  templateUrl: './profil-p.page.html',
  styleUrls: ['./profil-p.page.scss'],
})
export class ProfilPPage implements OnInit {

  erreur: string;
  users: Observable<any[]>;
  nbrbien: any;

  constructor(
    public firestore: AngularFirestore,
    public router: Router,
    private data: DataService,
    public alertController: AlertController
  ) {
    this.users = this.data.getUser();
    this.nbrbien = this.data.nbrbien;
  }

  ngOnInit() {
  }

  signOut(){
    const auth = getAuth();
    signOut(auth).then(() => {
      this.router.navigate(['home']);
    }).catch((error) => {
      this.erreur = 'Une erreur s\'est produite... Veillez réessayer';
    });
  }

  deleteUser(){
    this.data.deleteUser();
    this.data.deleteItem('users', firebase.auth().currentUser.uid);
    this.router.navigate(['/']);
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      // eslint-disable-next-line max-len
      message: 'Vous etes sur le point de supprimer votre compte. Une fois cette action réalisée, toutes vos données seront supprimés. Etes vous sur de vouloir continuer ? ',
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
          handler: () => {
            this.deleteUser();
          }
        }
      ]
    });

    await alert.present();
  }

}
