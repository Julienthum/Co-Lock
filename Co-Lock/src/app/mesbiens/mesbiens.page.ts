import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { getAuth, signOut } from 'firebase/auth';
import { Router } from '@angular/router';

import firebase from 'firebase/compat/app';
import 'firebase/auth';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-mesbiens',
  templateUrl: './mesbiens.page.html',
  styleUrls: ['./mesbiens.page.scss'],
})
export class MesbiensPage implements OnInit {
  biens: Observable<any[]>;

  erreur: string;

  constructor(
    public firestore: AngularFirestore,
    public router: Router,
    private data: DataService
  ) {
    this.biens = this.data.getRestos();
  }


  ngOnInit() {
  };

}
