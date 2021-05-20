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
  education;
  experience;
  user;
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

  editschema = {
    "type": "object",
    "title": "Comment",
    "properties": {
      "Email": {
        "title": "Email",
        "type": "string",
      },
      "ContactNumber": {
        "title": "Contact Number",
        "type": "string",
      }
    }
  };
  institutedetail: any;
  personalData;

  constructor() {  }

  ngOnInit(): void {
    this.institute = JSON.parse(localStorage.getItem('institute-detail')).BasicDetails;
    this.institutedetail = JSON.parse(localStorage.getItem('institute-detail'));
    this.affiliations = JSON.parse(localStorage.getItem('affiliations'));
    this.attestations = JSON.parse(localStorage.getItem('education'));
    console.log(this.affiliations)
    this.personalData = {
      'Email':this.institute.Email,
      'ContactNumber': this.institute.ContactNumber
    }
  }

  onAffiliationSubmit(event){
    console.log(event);
    // this.user.details = this.editform.value
    event.attested = "pending"
    this.affiliations = event;
    localStorage.setItem('affiliations', JSON.stringify(this.affiliations));
    // this.education = this.educationForm.value
  }
  onEditProfileSubmit(event){
    this.institute.Email = event.Email;
    this.institute.ContactNumber = event.ContactNumber;
    this.institutedetail.BasicDetails.Email = event.Email;
    this.institutedetail.BasicDetails.ContactNumber = event.ContactNumber;
    localStorage.setItem('institute-detail', JSON.stringify(this.institutedetail));
  }

}


