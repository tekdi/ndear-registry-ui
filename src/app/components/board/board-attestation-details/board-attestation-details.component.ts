import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-board-attestation-details',
  templateUrl: './board-attestation-details.component.html',
  styleUrls: ['./board-attestation-details.component.css']
})
export class BoardAttestationDetailsComponent implements OnInit {
  
  affiliations: any;
  institute: any;
  noteAdded: boolean = false;
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
    "required":[
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

  constructor(private route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    this.affiliations = JSON.parse(localStorage.getItem('affiliations'));
    this.institute = JSON.parse(localStorage.getItem('institute-detail'));
  }

  onAttest(){
    this.affiliations.attested = true;
    localStorage.setItem('affiliations',JSON.stringify(this.affiliations))
    this.router.navigate(['board-attestation']);
  }

  
  onAttestApprove(action,event){
      // this.affiliations.attested = action;
      this.affiliations.note = event.note;
      this.noteAdded = true;
      localStorage.setItem('affiliations',JSON.stringify(this.affiliations))
      // console.log(this.noteAdded)
      // this.router.navigate(['board-attestation']);
    // window.location.reload();
  }

  onAttestDeny(action,event){
    this.affiliations.attested = action;
    this.affiliations.note = event.note;
    localStorage.setItem('affiliations',JSON.stringify(this.affiliations))
    this.router.navigate(['board-attestation']);
  // window.location.reload();
}

}
