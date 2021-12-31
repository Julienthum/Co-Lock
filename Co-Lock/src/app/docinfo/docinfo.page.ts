import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { observable, Observable } from 'rxjs';
import { DataService, Docs } from '../services/data.service';
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

  doc: any;

  docs;
  essaieForm: FormGroup;
  info = '';

  url = '';
  barStatus = false;
  imageUploads = [];

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
    this.data.getDocByKey(id).subscribe((res) => this.docs = res);
    this.essaieForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      url: [''],
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
    this.data.deleteDoc('documents', this.docs.spaceRef);
    this.data.deleteItem('documents', this.docs.id);
  }

  uptdateDoc(){
    const newItem = {
      spaceRef: this.data.imageName(),
      url: this.url,
    };
    this.data.updateItem('documents', this.docs.id, newItem );
  }

  uploadPhoto(event) {
    this.barStatus = true;
    this.data.storeImage(event.target.files[0]).then(
        (res: any) => {
            if (res) {
                this.url = res;
                this.imageUploads.unshift(res);
                this.barStatus = false;
        }
    },
    (error: any) => {
        this.barStatus = false;
        }
      );
    }

    lien(url){
      window.open(url, '_system');
    }
}
