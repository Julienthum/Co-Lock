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
  compteur: number;

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
    this.count();
  }


  async  count(){
    firebase.firestore().collection('biens')
      .where('moi', '==', firebase.auth().currentUser.uid)
      .onSnapshot(querySnapshot => {
        this.compteur = querySnapshot.size;
        console.log('this compteur',this.compteur);

});
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
    // delete all req of proprio
    const req = this.data.getAll('requetes', 'idProprio',firebase.auth().currentUser.uid);
    req.subscribe(docs => docs.forEach(element => {
      this.data.deleteItem('requetes', element.id);
    }));
    // delete all doc of proprio
    const doc = this.data.getAll('documents', 'moi',firebase.auth().currentUser.uid);
    doc.subscribe(docs => docs.forEach(element => {
      this.data.deleteItem('documents', element.id);
      this.data.deleteDoc('documents', element.spaceRef);
    }));
    // delete all biens of proprio
    const bien = this.data.getAll('biens', 'moi',firebase.auth().currentUser.uid);
    bien.subscribe(docs => docs.forEach(element => {
      this.data.deleteItem('biens', element.id);
      this.data.deleteDoc('biens', element.spaceRef);
    }));
    // delete user info
    this.data.deleteItem('users', firebase.auth().currentUser.uid);
    // delete user login info
    this.data.deleteUser();
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
