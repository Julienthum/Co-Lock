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

  ngOnInit() {
   // this.getTest1();
    //this.getTest().subscribe((res) => (this.bien = res));
    this.biens = this.getTest();


  }
  public getTest1(): Observable<Biens[]>{
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
  public  getTest() {

    return this.firestore
      .collection<Biens>('biens', (ref) =>
        ref
          .where('code', '==', 'LO-5077-7957-C')
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => a.payload.doc.data() as Biens)
        )
      );
  }
}
