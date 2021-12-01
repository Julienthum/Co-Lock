import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-docpreviewd',
  templateUrl: './docpreviewd.component.html',
  styleUrls: ['./docpreviewd.component.scss'],
})
export class DocpreviewdComponent implements OnInit {

  @Input() imageUploads: any;

  constructor() { }

  ngOnInit() {}

}
