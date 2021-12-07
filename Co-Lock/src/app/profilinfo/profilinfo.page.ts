import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';
import firebase from 'firebase/compat/app';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profilinfo',
  templateUrl: './profilinfo.page.html',
  styleUrls: ['./profilinfo.page.scss'],
})
export class ProfilinfoPage implements OnInit {

  users: Observable<any[]>;
  essaieForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public firestore: AngularFirestore,
    public router: Router,
    private data: DataService,
  ) {
    this.users = this.data.getUser();
  }

  ngOnInit() {
    this.essaieForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(10)]],
    });
  }

  uptadeItem(){
    const newItem = {
      name :  this.essaieForm.value.name,
      prenom : this.essaieForm.value.prenom,
      mobile :  this.essaieForm.value.mobile,
    };
    this.data.updateItem('users', firebase.auth().currentUser.uid, newItem );
  }


}
