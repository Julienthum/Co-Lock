import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-monbien',
  templateUrl: './monbien.page.html',
  styleUrls: ['./monbien.page.scss'],
})


export class MonbienPage implements OnInit {

  constructor(
    public firestore: AngularFirestore,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);

  }

}
