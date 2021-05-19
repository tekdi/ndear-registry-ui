import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-institute-profile',
  templateUrl: './institute-profile.component.html',
  styleUrls: ['./institute-profile.component.scss']
})
export class InstituteProfileComponent implements OnInit {
  institute;
  affiliations;
  attestations;
  header1: string = 'institute';
  tab: string = 'home';

  schema = {
    "type": "object",
    "title": "Affliliation",
    "properties": {
      "affiliationType": {
        "title": "Affiliation Type",
        "type": "string",
        "enum": ['CBSC Board', 'State Board']
      },
      "grantYear": {
        "title": "Grant Year",
        "type": "string",
        "format": "date",
        "widget": {
          "id": "date"
        },
      },
      "expiryYear": {
        "title": "Expiry Year",
        "type": "string",
        "format": "date"
        
      },
      "affiliationNumber": {
        "title": "Affiliation Number",
        "type": "string"
      },
      "classes": {
        "title": "Classes/Grades",
        "type": "string"
      },
      "send": {
        "title": " Send for verification?",
        "type": "boolean",
        "default": true
      }
    },
    "required": [
      "affiliationType",
      "grantYear",
      "expiryYear",
      "affiliationNumber"
    ]
  };
  form: [
    '*',
    {
      "type": "submit",
      "style": "btn-info",
      "title": "save"
    }
  ]

  constructor() {  }

  ngOnInit(): void {
    this.institute = JSON.parse(localStorage.getItem('institute-detail')).BasicDetails;
    this.affiliations = JSON.parse(localStorage.getItem('affiliations'));
    this.attestations = JSON.parse(localStorage.getItem('education'));
    console.log(this.affiliations)
  }

  onAffiliationSubmit(event){
    console.log(event);
    // this.user.details = this.editform.value
    event.attested = "pending"
    this.affiliations = event;
    localStorage.setItem('affiliations', JSON.stringify(this.affiliations));
    // this.education = this.educationForm.value
  }

}


