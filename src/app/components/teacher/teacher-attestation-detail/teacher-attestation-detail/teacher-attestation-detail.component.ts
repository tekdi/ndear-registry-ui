import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AttestationService } from '../../../../services/attestation/attestation.service';
import { TeacherProfileService } from '../../../../services/teacher/teacher-profile.service';

@Component({
  selector: 'app-teacher-attestation-detail',
  templateUrl: './teacher-attestation-detail.component.html',
  styleUrls: ['./teacher-attestation-detail.component.css']
})
export class TeacherAttestationDetailComponent implements OnInit {
  entityId: string;
  user: any;
  education: any;
  educationDetail: any;
  experience: any;
  experienceDetail: any;
  id: string;
  type: string;
  contact: string;
  consent: any = false;
  noteAdded: boolean = false;
  claimId: string;
  entityIdt: string;

  approveNoteSchema = {
    "type": "object",
    "title": "Invite",
    "properties": {
      "note": {
        "type": "string",
      },
    }
  }

  denyNoteSchema = {
    "type": "object",
    "title": "Invite",
    "required": [
      "note"
    ],
    "properties": {
      "note": {
        "title": "Reason for deny",
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
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public attestationService: AttestationService,
    public teacherProfileService: TeacherProfileService
  ) {

    //this.router.getCurrentNavigation().extras.state.entityId;
    //this.claimBody = this.attestationService.studentEntity;
    // console.log("route res",  this.entityId)
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      var data = JSON.parse(atob(params.id));
      console.log({ data });
      this.entityId = data.entityId;
      this.claimId = data.claimId;

    });

    this.teacherProfileService.getTeacherProfile('').subscribe((res) => {
      this.entityIdt = res[0].osid;
    })

    
    //history.state;
    this.getStudentData();
  }

  getStudentData() {
    this.attestationService.getStudentProfile(this.entityId).subscribe((res) => {
      this.user = res;
    });
  }

  onAttestApproveReject(action, event) {

    if(action == 'GRANT_CLAIM')
    {
      event =  JSON.parse(localStorage.getItem('note'));
    }

    let data = {
      'entityId': this.entityIdt,
      'claimId': this.claimId
    }

    this.attestationService.attastedByTeacher(data, action, event.note).subscribe((res) => {
      alert('success');
      console.log(res);
    },(err)=>{
      console.log(err);

    })


    //this.noteAdded = true;
    // this.router.navigate(['institute-attestation']);
    // window.location.reload();
  }

  onConsent() { }

  saveNote(event){
    localStorage.setItem('note', JSON.stringify(event));
    this.noteAdded = true;

  }

}
