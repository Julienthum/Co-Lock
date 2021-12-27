import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-requeteinfo',
  templateUrl: './requeteinfo.page.html',
  styleUrls: ['./requeteinfo.page.scss'],
})
export class RequeteinfoPage implements OnInit {

  req;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private data: DataService,
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.data.getReqByKey(id).subscribe((res) => this.req = res);
  }

  statutNew(){
    const newItem = {
      etat: 'Nouveau'
    };
    this.data.updateItem('requetes', this.req.id, newItem );
  }

  statutWorking(){
    const newItem = {
      etat: 'En cours'
    };
    this.data.updateItem('requetes', this.req.id, newItem );
  }

  statutFinish(){
    const newItem = {
      etat: 'Terminée'
    };
    this.data.updateItem('requetes', this.req.id, newItem );
  }
}
