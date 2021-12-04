import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.page.html',
  styleUrls: ['./acceuil.page.scss'],
})
export class AcceuilPage implements OnInit {

  email: string;

  users: Observable<any[]>;

  constructor(
    private data: DataService
  ) {
    this.users = this.data.getUser();
  }


  ngOnInit() { }


}
