import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-institute-attestation-detail',
  templateUrl: './institute-attestation-detail.component.html',
  styleUrls: ['./institute-attestation-detail.component.css']
})
export class InstituteAttestationDetailComponent implements OnInit {
  user;
  education;
  educationDetail;
  id;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
      this.id = params['id']
    });
    this.user = JSON.parse(localStorage.getItem('user'));
    this.educationDetail = JSON.parse(localStorage.getItem('education'))[this.id];
    this.education = JSON.parse(localStorage.getItem('education'));
  }

}
