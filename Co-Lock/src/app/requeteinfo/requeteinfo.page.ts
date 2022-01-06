import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import firebase from 'firebase/compat/app';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-requeteinfo',
  templateUrl: './requeteinfo.page.html',
  styleUrls: ['./requeteinfo.page.scss'],
})
export class RequeteinfoPage implements OnInit {

  req;
  auteur;
  currentUser;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private data: DataService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.data.getReqByKey(id).subscribe((res) => this.req = res);
    this.currentUser = firebase.auth().currentUser.uid;
    console.log(this.currentUser);

  }

  statutNew(){
    const newItem = {
      etat: 'Nouveau',
    };
    this.data.updateItem('requetes', this.req.id, newItem );
  }

  statutWorking(){
    const newItem = {
      etat: 'En cours',
      inprogress: firebase.firestore.FieldValue.serverTimestamp()
    };
    this.data.updateItem('requetes', this.req.id, newItem );
  }

  statutFinish(){
    const newItem = {
      etat: 'Terminée',
      finish: firebase.firestore.FieldValue.serverTimestamp()
    };
    this.data.updateItem('requetes', this.req.id, newItem );
  }

  deleted(){
    const newItem = {
      deleted: true
    };
    this.data.updateItem('requetes', this.req.id, newItem);
  }


  async confirmDelete() {
    const alert = await this.alertController.create({
      header: 'Suppression',
      subHeader: 'Etes vous sur de vouloir supprimer la requete ? ',
      buttons: [
        { text: 'Supprimer',
          handler: () => {
            this.deleted();
            this.router.navigate(['./monbien/'+ this.req.idBien]);
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

  async confirmInprogress() {
    const alert = await this.alertController.create({
      header: 'Changement d\'avancement',
      subHeader: 'Etes vous sur de vouloir changer le statut de votre requete ? ',
      message: 'Le changement de statut de votre requetes ne vous permettra pas de revenir au précedent.',
      buttons: [
        { text: 'Changer',
          handler: () => {
            this.statutWorking();
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

  async confirmFinish() {
    const alert = await this.alertController.create({
      header: 'Changement d\'avancement',
      subHeader: 'Etes vous sur de vouloir changer le statut de votre requete ? ',
      message: 'Le changement de statut de votre requetes ne vous permettra pas de revenir au précedent.',
      buttons: [
        { text: 'Changer',
          handler: () => {
            this.statutFinish();
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
