import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-bienloc',
  templateUrl: './bienloc.page.html',
  styleUrls: ['./bienloc.page.scss'],
})
export class BienlocPage implements OnInit {

  constructor(
    private data: DataService
  ) { }

  ngOnInit() {
  }

}
