import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-infoloc',
  templateUrl: './infoloc.page.html',
  styleUrls: ['./infoloc.page.scss'],
})
export class InfolocPage implements OnInit {

  loc;

  constructor(
    private activatedRoute: ActivatedRoute,
    private data: DataService,
    private alertController: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.data.getUserByKey(id).subscribe((res) => this.loc = res);
  }

  delete(){
    const newItem = {
      code : '',
    };
    this.data.updateItem('users', this.loc.id, newItem);
  }

  async confirmDelete() {
    const alert = await this.alertController.create({
      header: 'Suppression',
      subHeader: 'Etes vous sur de vouloir supprimer ce locataire ? ',
      buttons: [
        { text: 'Supprimer',
          handler: () => {
            this.delete();
            this.router.navigate(['./monbien/'+ this.data.docId]);
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
