import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { Share } from '@capacitor/share';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-monbien',
  templateUrl: './monbien.page.html',
  styleUrls: ['./monbien.page.scss'],
})


export class MonbienPage implements OnInit {

  docs: Observable<any[]>;

  newReqs: Observable<any[]>;
  inprogressReqs: Observable<any[]>;
  finishReqs: Observable<any[]>;

  reqs: Observable<any[]>;

  newRem: Observable<any[]>;
  inprogressRem: Observable<any[]>;
  finishRem: Observable<any[]>;

  loc: Observable<any[]>;

  bien;
  idBien;


  constructor(
    public firestore: AngularFirestore,
    private activatedRoute: ActivatedRoute,
    private data: DataService,
    private alertController: AlertController,
    public router: Router,
  ) { }

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.data.getRestoByKey(id).subscribe((res) => (this.bien = res));
    this.data.getDocId(id);
    const itself = {
      itself: id,
    };
    this.data.updateItem('biens', id, itself);
    this.docs = this.data.getDocs('documents');
    this.reqs = this.data.getAllReqBiens(id);
    this.newReqs = this.data.getReqBiens('Nouveau', id);
    this.inprogressReqs = this.data.getReqBiens('En cours', id);
    this.finishReqs = this.data.getReqBiens('Terminée', id);
    this.newRem = this.data.getReminder('Nouveau', id);
    this.inprogressRem = this.data.getReminder('En cours', id);
    this.finishRem = this.data.getReminder('Terminée', id);

    const code = await firebase.firestore().collection('biens').doc(id)
    .get().then(( ref => ref.data().code));
    this.loc = this.data.getLoc(code);
  }

  deleteResto() {
    this.docs.subscribe(docs => docs.forEach(element => {
      console.log(element.id);
      this.data.deleteItem('documents', element.id);
      this.data.deleteDoc('documents', element.spaceRef);
    }));
    this.reqs.subscribe(req => req.forEach(element => {
      console.log(element.id);
      this.data.deleteItem('requetes', element.id);
    }));
    this.data.deleteDoc('photoBien', this.bien.spaceRef);
    this.data.deleteItem('biens', this.bien.id);
  }

  archive(){
    const newItem = {
      deleted: true
    };
    this.reqs.subscribe(req => req.forEach(element => {
      this.data.updateItem('requetes', element.id, newItem);
    }));
    this.data.updateItem('biens', this.bien.id, newItem);
  }


  async share(){
    await Share.share({
      title: 'Acces bien',
      text: 'Voici le code pour accéder à l\'application CO-LOCK ' + this.bien.code,
    });
  }

  lien(url){
    window.open(url, '_system');
  }


  ///////// CONFIRMATION DE L'ACTION /////////

  async confirmArchive() {
    const alert = await this.alertController.create({
      header: 'Archivage',
      subHeader: 'Êtes-vous sur de vouloir archiver ce bien ? ',
      message: 'Tous bien archivé pour etre récupéré dans le section \'archive\' sur le page d’accueil.',
      buttons: [
        { text: 'Archiver',
          handler: () => {
            this.archive();
            this.router.navigate(['/navbar/mesbiens']);
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

