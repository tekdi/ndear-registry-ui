import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-institute-profile-select',
  templateUrl: './institute-profile-select.component.html',
  styleUrls: ['./institute-profile-select.component.scss']
})
export class InstituteProfileSelectComponent implements OnInit {
  header1: string = 'plain';
  user: any;
  institute;
  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.institute = JSON.parse(localStorage.getItem('institute-detail'));
  }

}
