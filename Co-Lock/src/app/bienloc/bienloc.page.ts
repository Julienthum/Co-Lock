import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { map } from 'rxjs/operators';



export interface Biens {
  name: string;
  rue: string;
  numero: number;
  zip: number;
  ville: string;
  province: string;
  pays: string;
  superficie: number;
  prix: number;
  place: number;
  image: string;
  moi: string;
  code: string;
  cp: number;
  description: string;
}

@Component({
  selector: 'app-bienloc',
  templateUrl: './bienloc.page.html',
  styleUrls: ['./bienloc.page.scss'],
})
export class BienlocPage implements OnInit {

  biens: Observable<any[]>;

  erreur: string;

  bien;

  docs: Observable<any[]>;


  constructor(
    private data: DataService,
    public firestore: AngularFirestore,
    public router: Router,
  ) {

  }

   async ngOnInit() { // normalement ne pas mettre de async ici mais blc
   // this.getTest1(); marche pas
    //this.getTest().subscribe((res) => (this.bien = res)); marche pas
    this.biens = await this.getTest(); //ca marche a  1OO% je suis trop fort
    //(await this.getTest()).subscribe(res => this.bien = res);

    if( await this.donnee() === 'LO-5077-7957-C'){// blc
      console.log( await this.donnee());
      return await this.donnee();
    } else { console.log('ca marche pas ptn ');
    }



  }
  async donnee() {//blc
  const jay = await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
    .get().then(( doc => doc.data().code));
    return await jay;

  }
  public  async  getTest() {//nice
    const jay = await    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
    .get().then(( doc => doc.data().code));
    return this.firestore
      .collection<Biens>('biens', (ref) => ref
        .where('code', '==', jay)
      )
      .snapshotChanges()
      .pipe(
        map((actions) => actions.map((a) => a.payload.doc.data() as Biens)
        )
      );
  }
  public getTest1(): Observable<Biens[]>{ // marche pas de ouf a test, sert a r en vrai
    return this.firestore.collection<Biens>('biens', (ref) => ref
      .where('code', '==', 'LO-5077-7957-C')
    )
      .valueChanges();

  }
  lien(url){
    window.open(url, '_system');
  }
  deleteResto() {
    this.data.deleteItem('biens', this.bien.id);
  }

}
