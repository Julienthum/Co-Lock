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
    description: '',
    rue: '',
    numero: '',
    ville: '',
    codepostal: '',
    province: '',
    superficie: '',
    nbrePlace: '',
    prix: '',
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
      header: 'Bien Ajouté !',
      message: 'Votre bien à correctement été ajouté.',
      buttons: ['Continuer']
    });

    await alert.present();
  };

}
