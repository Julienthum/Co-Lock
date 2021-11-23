import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular/';

@Component({
  selector: 'app-ajoutbien',
  templateUrl: './ajoutbien.page.html',
  styleUrls: ['./ajoutbien.page.scss'],
})
export class AjoutbienPage implements OnInit {

  users: Observable<any[]>;
  firebaseData = {
    nomDuBien: '',
    rue: '',
    numero: '',
    ville: '',
    codepostal: '',
    province: '',
    superficie: '',
    nbrePlace: '',
    image: ''
  };

  constructor(
    public firestore: AngularFirestore,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    public alertController: AlertController,
  ) {
    this.users = this.firestore.collection('biens').valueChanges();
  }

  addFirebase(){
    this.firestore.collection('biens').add(this.firebaseData);
  };

  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'Votre bien à correctement été ajouté.',
      buttons: ['Continuer']
    });

    await alert.present();
  };
}
