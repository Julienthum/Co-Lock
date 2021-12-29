import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-infoloc',
  templateUrl: './infoloc.page.html',
  styleUrls: ['./infoloc.page.scss'],
})
export class InfolocPage implements OnInit {

  loc;

  constructor(
    private activatedRoute: ActivatedRoute,
    private data: DataService
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.data.getUserByKey(id).subscribe((res) => this.loc = res);
  }

}
