import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';
import firebase from 'firebase/compat/app';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getAuth, updateEmail, updatePassword } from 'firebase/auth';
import { AlertController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/compat/storage';


const auth = getAuth();

@Component({
  selector: 'app-docinfo',
  templateUrl: './docinfo.page.html',
  styleUrls: ['./docinfo.page.scss'],
})
export class DocinfoPage implements OnInit {


  docs;
  essaieForm: FormGroup;
  info = '';

  constructor(
    public formBuilder: FormBuilder,
    public firestore: AngularFirestore,
    public router: Router,
    private data: DataService,
    public alertController: AlertController,
    private activatedRoute: ActivatedRoute,
    private angularFireStorage: AngularFireStorage
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.data.getRestoByKey(id).subscribe((res) => this.docs = res);
    this.essaieForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
    });

  }


  uptadeInfo(){
    const newItem = {
      name:  this.essaieForm.value.name,
      description: this.essaieForm.value.description,
    };
    this.data.updateItem('documents', this.docs.id, newItem );
  }

  deleteResto() {
    this.data.deleteItem('documents', this.docs.id);
  }
}
