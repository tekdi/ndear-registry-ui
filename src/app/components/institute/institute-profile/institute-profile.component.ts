import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-institute-profile',
  templateUrl: './institute-profile.component.html',
  styleUrls: ['./institute-profile.component.css']
})
export class InstituteProfileComponent implements OnInit {
  user;
  ids;
  attestations;
  header1: string = 'institute';
  tab: string = 'home';
  constructor() {  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('institute-detail')).BasicDetails;
    this.ids = JSON.parse(localStorage.getItem('institute-detail')).IDDetails;
    this.attestations = JSON.parse(localStorage.getItem('education'));
  }

}
