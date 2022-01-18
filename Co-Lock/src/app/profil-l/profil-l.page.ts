/* eslint-disable arrow-body-style */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import firebase from 'firebase/compat/app';
import { getAuth, signOut } from 'firebase/auth';
import { DataService } from '../services/data.service';
import { Observable, } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActionSheetController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profil-l',
  templateUrl: './profil-l.page.html',
  styleUrls: ['./profil-l.page.scss'],
})
export class ProfilLPage implements OnInit {
  erreur: string;
  users: Observable<any[]>;
  typeem: any[];
  typepr: any[];
  typena: any[];
  typemo: any[];
  compteur: number;
  // eslint-disable-next-line @typescript-eslint/ban-types
  datas: object;
  constructor(
    public firestore: AngularFirestore,
    public router: Router,
    private data: DataService,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController
  ) {
    this.users = this.data.getUser();
  }
  async ngOnInit() {
  await this.ptshs();
   this.count();
   console.log(this.users);

  }
  async  count(){
    firebase.firestore().collection('requetes')
     .where('auteur', '==', firebase.auth().currentUser.uid)
     .where('etat', '==', 'En cours')
.onSnapshot(querySnapshot => {
   this.compteur = querySnapshot.size;
  console.log('this compteur',this.compteur);});
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


 async ptshs(){// Lien entre trois tables qui affiche les données du proprio au locataire
  const jay =  await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
  .get().then(( doc => doc.data().code));
    const querySnapshots = await firebase.firestore().collection('biens')
     .where('code', '==', jay).get();
      const gil = querySnapshots.docs.map(doc =>
         doc.data().moi);
       await firebase.firestore().collection('users').doc(gil[0])
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      .get().then(( doc) =>  {  this.typeem = doc.data().email,
        this.typemo = doc.data().mobile,
        this.typena = doc.data().name,
        this.typepr = doc.data().prenom;} );
}


  //////////// CONFIRMATION DE L'ACTION /////////////


  // 1° Suppression du compte

  async handleButtonClick() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Etes vous sûr de vouloir supprimer votre compte ?',
      // eslint-disable-next-line max-len
      subHeader: 'La suppression du compte entraine la suppression de toutes les données liés à celui-ci (biens, documents, requetes...). Cette action est irréversible.',
      buttons: [
        { text: 'Supprimer',
          role: 'destructive',
          handler: () => {
            this.deleteUser();

          }
      },
        { text: 'Annuler', role: 'cancel',
        handler: () => {
          console.log('Cancel');

        } },
      ],
    });

    await actionSheet.present();
  }


  // 2° Déconnexion

  async confirmSignOut() {
    const alert = await this.alertController.create({
      header: 'Déconnexion',
      subHeader: 'Etes vous sur de vouloir vous déconnecter ? ',
      buttons: [
        { text: 'Déconnexion',
          handler: () => {
            this.signOut();
          }
      },
        { text: 'Annuler', role: 'cancel',
          handler: () => {
            console.log('Cancel');
        } },
      ],
    });

    await alert.present();
  }
}
