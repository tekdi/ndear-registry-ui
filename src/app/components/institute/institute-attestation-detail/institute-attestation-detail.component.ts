import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  type;
  constructor(private route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
      this.id = params['id']
      this.type = params['type']
    });
    this.user = JSON.parse(localStorage.getItem('user'));
    if(this.type == 'experience'){
      this.educationDetail = JSON.parse(localStorage.getItem('experience'))[this.id];
      this.education = JSON.parse(localStorage.getItem('experience'));
    }else{
      this.educationDetail = JSON.parse(localStorage.getItem('education'))[this.id];
      this.education = JSON.parse(localStorage.getItem('education'));
    }
    
  }

  onAttestApprove(action){
    this.educationDetail.attested = action;
    this.education[this.id] = this.educationDetail;
    if(this.type == 'experience'){
      localStorage.setItem('experience', JSON.stringify(this.education))
    }else{
      localStorage.setItem('education', JSON.stringify(this.education))
    }
    this.router.navigate(['institute-attestation']);
  }

}
