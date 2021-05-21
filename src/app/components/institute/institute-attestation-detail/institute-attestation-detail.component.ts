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
  experience;
  experienceDetail;
  id;
  type;
  contact;
  consent: any = false;
  approveNoteSchema = {
    "type": "object",
    "title": "Invite",
    "properties": {
      "note": {
        "title": "Approve note",
        "type": "string",
      },
    }
  }

  denyNoteSchema = {
    "type": "object",
    "title": "Invite",
    "required":[
      "note"
    ],
    "properties": {
      "note": {
        "title": "Reason for deniel",
        "type": "string",
      },
    }
  }

  form = [
    {
      "key": "note",
      "type": "textarea",
      "placeholder": "Type your note.."
    },
    {
      "type": "submit",
      "style": "btn btn-primary text-end mb-3 fw-bold text-capitalize",
      "title": "Submit"
    }
  ]
  constructor(private route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
      this.id = params['id']
      this.type = params['type']
    });
    this.user = JSON.parse(localStorage.getItem('user'));
    this.consent = this.user.consent;
    if(this.consent != 'granted'){
      this.contact = this.user.mobileEmail[0] + "*".repeat(this.user.mobileEmail.length - 2) + this.user.mobileEmail.slice(-1);
    }else{
      this.contact = this.user.mobileEmail
    }
    
    if(this.type == 'experience'){
      this.experienceDetail = JSON.parse(localStorage.getItem('experience'))[this.id];
      this.experience = JSON.parse(localStorage.getItem('experience'));
    }else{
      this.educationDetail = JSON.parse(localStorage.getItem('education'))[this.id];
      this.education = JSON.parse(localStorage.getItem('education'));
    }
    
  }

  onAttestApprove(action,event){
    
    if(this.type == 'experience'){
      this.experienceDetail.attested = action;
      this.experienceDetail.note = event.note;
      this.experience[this.id] = this.experienceDetail;
      localStorage.setItem('experience', JSON.stringify(this.experience))
    }else{
      this.educationDetail.note = event.note;
      this.educationDetail.attested = action;
      this.education[this.id] = this.educationDetail;
      localStorage.setItem('education', JSON.stringify(this.education))
    }
    // this.router.navigate(['institute-attestation']);
    window.location.reload();
  }
  onConsent(){
    this.user.consent = true;
    this.consent = true;
    localStorage.setItem('user',JSON.stringify(this.user));
  }

}
