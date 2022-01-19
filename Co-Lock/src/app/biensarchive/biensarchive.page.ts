import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { getAuth, signOut } from 'firebase/auth';
import { Router } from '@angular/router';

import firebase from 'firebase/compat/app';
import 'firebase/auth';
import { DataService } from '../services/data.service';
import { ActionSheetController } from '@ionic/angular';
@Component({
  selector: 'app-biensarchive',
  templateUrl: './biensarchive.page.html',
  styleUrls: ['./biensarchive.page.scss'],
})
export class BiensarchivePage implements OnInit {

  biens: Observable<any[]>;

  erreur: string;

  doc: Observable<any[]>;
  reqs: Observable<any[]>;

  constructor(
    public firestore: AngularFirestore,
    public router: Router,
    private data: DataService,
    private actionSheetController: ActionSheetController
  ) {
    this.biens = this.data.getRestosArchive();
  }

  ngOnInit() {
  };

  getBack(id){
    const newItem = {
      deleted: false
    };
    this.data.updateItem('biens', id, newItem);
  }

  delete(id, spaceRef) {
    this.doc = this.data.getDocs('documents');
    this.reqs = this.data.getAllReqBiens(id);
    this.doc.subscribe(docs => docs.forEach(element => {
      console.log(element.id);
      this.data.deleteItem('documents', element.id);
      this.data.deleteDoc('documents', element.spaceRef);
    }));
    this.reqs.subscribe(req => req.forEach(element => {
      console.log(element.id);
      this.data.deleteItem('requetes', element.id);
      this.data.deleteDoc('requetes', element.spaceRef);
    }));
    this.data.deleteDoc('photoBien', spaceRef);
    this.data.deleteItem('biens', id);
  }

  //////////// Confirmation de la suppression //////////////

async handleButtonClick(id, spaceRef) {
  const actionSheet = await this.actionSheetController.create({
    header: 'Êtes-vous sûr de vouloir supprimer votre compte ?',
    // eslint-disable-next-line max-len
    subHeader: 'La suppression du compte entraine la suppression de toutes les données liés à celui-ci (biens, documents, requetes...). Cette action est irréversible.',
    buttons: [
      { text: 'Supprimer',
        role: 'destructive',
        handler: () => {
          this.delete(id, spaceRef);
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

}
