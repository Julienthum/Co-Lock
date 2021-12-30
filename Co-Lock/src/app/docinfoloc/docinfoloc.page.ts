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


@Component({
  selector: 'app-docinfoloc',
  templateUrl: './docinfoloc.page.html',
  styleUrls: ['./docinfoloc.page.scss'],
})
export class DocinfolocPage implements OnInit {

  docs;
  essaieForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public firestore: AngularFirestore,
    public router: Router,
    private data: DataService,
    public alertController: AlertController,
    private activatedRoute: ActivatedRoute,
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

  lien(url){
    window.open(url, '_system');
  }

}
