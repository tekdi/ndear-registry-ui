import { Component, OnInit } from '@angular/core';
import { InstituteProfileService } from '../../../services/institute/institute-profile.service';

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
  item: any;

  schema = {
    "type": "object",
    "title": "Affliliation",
    "properties": {
      "affiliationType": {
        "title": "Affiliation Board",
        "type": "string",
        "enum": ['CBSE Board', 'State Board']
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
      "send": {
        "title": " Send for verification?",
        "type": "boolean",
        "default": true
      }
    },
    "required": [
      "affiliationType",
      "grantYear",
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
    "title": "Teacher",
    "definitions": {
      "BasicDetails": {
        "type": "object",
        "required": [
          "instituteName",
          "ContactNumber",
          "Email",
          "instututeType",
          "SchoolType",
          "ManagementOfInstitute",
          "YearOfEstablishmentOfInstitute",
          "headPerson",
          "trust"
        ],
        "properties": {
          "instituteName": {
            "type": "string"
          },
          "logoUrl": {
            "type": "string"
          },
          "ContactNumber": {
            "title": "Landline / Mobile",
            "type": "number"
          },
          "Email": {
            "type": "string"
          },
          "Website": {
            "type": "string"
          },
          "Social": {
            "type": "string"
          },
          "headPerson": {
            "title": "Principal / Dean / Head - Full Name",
            "type": "string"
          },
          "trust": {
            "title": "Name of Trust / Society / Managing Committee",
            "type": "string"
          },
          "instututeType": {
            "title": "Institute Category",
            "type": "array",
            "items": {
              "type": "string",
              "enum": [
                "Primary only with grades 1 to 5",
                "Upper Primary with grades 1 to 8",
                "Higher Secondary with grades 1 to 12",
                "Upper Primary only with grades 6 to 8",
                "Higher Secondary with grades 6 to 12",
                "Secondary/Sr. Sec. with grades 1 to 10",
                "Secondary/Sr. Sec. with grades 6 to 10",
                "Secondary/Sr. Sec. only with grades 9 & 10",
                "Higher Secondary with grades 9 to 12",
                "Hr. Sec. /Jr. College only with grades 11 & 12"
              ]
            }

          },
          "SchoolType": {
            "title": "School Type",
            "type": "string",
            "enum": [
              "Boys",
              "Girls",
              "Co-ed"
            ]
          },
          "ManagementOfInstitute": {
            "title": "Management Of Institute",
            "type": "array",
            "items": {
              "type": "string",
              "enum": [
                "Department of Education",
                "Tribal Welfare Department",
                "Local Body",
                "Government Aided",
                "Private Unaided (Recognized)",
                "Other Govt. managed schools",
                "Unrecognized",
                "Social Welfare Department",
                "Other Central Govt. Schools",
                "Ministry of Labour",
                "Kendriya Vidyalaya / Central School",
                "Jawahar Navodaya Vidyalaya",
                "Sainik School",
                "Railway School",
                "Central Tibetan School",
                "Madarsa Recognized (by Wakf board /Madarsa)",
                "Madarsa Unrecognized",
              ]
            }
          },
          "YearOfEstablishmentOfInstitute": {
            "type": "number"
          },
        }
      },
      "Address": {
        "type": "object",
        "required": [
          "Landmark",
          "Locality",
          "State",
          "District",
          "City",
          "pincode"
        ],
        "properties": {
          "Plot": {
            "type": "string"
          },
          "Street": {
            "type": "string"
          },
          "Landmark": {
            "type": "string"
          },
          "Locality": {
            "type": "string"
          },
          "State": {
            "type": "string"
          },
          "District": {
            "type": "string"
          },
          "City": {
            "title": "Village/Town/City",
            "type": "string"
          },
          "pincode": {
            "type": "number"
          },
        }
      },
    },
    "properties": {
      "BasicDetails": {
        "$ref": "#/definitions/BasicDetails"
      },
      "gstin": {
        "title": "GSTIN ID",
        "type": "string"
      },
      "Address": {
        "title": "Address",
        "$ref": "#/definitions/Address"
      }

    }
  };

  constructor(
    public instituteProfileService: InstituteProfileService
  ) { }

  ngOnInit(): void {
    this.institute = JSON.parse(localStorage.getItem('institute-detail'));
    this.affiliations = JSON.parse(localStorage.getItem('affiliations'));
    this.attestations = JSON.parse(localStorage.getItem('education'));
    console.log(this.affiliations);


    this.instituteProfileService.getInstituteProfile().subscribe((res)=>{
      console.log({res});
       this.item = res;

    })
  }

  onAffiliationSubmit(event) {
    console.log(event);
    // this.user.details = this.editform.value
    event.attested = "pending"
    event.note = "Attestation pending"
    this.affiliations = event;
    localStorage.setItem('affiliations', JSON.stringify(this.affiliations));
    // this.education = this.educationForm.value
  }
  onEditProfileSubmit(event) {
    this.institute = event;

    const data = {
      "schoolCode": "string",
      "schoolName": "Pragati Institute",
      "adminEmail": "admin@pragatiinstitute.com",
      "adminMobile": "",
      "address": {
        "addressLine1": "28",
        "addressLine2": "Munjaba Wasti",
        "district": "Dhanori",
        "state": "Maharastra",
        "pinCode": "411015"
      }
    }

    console.log('this.institute --> ', data);

    this.instituteProfileService.postInstituteProfile(data).subscribe((res) => {
      console.log({ res });
      if (res.responseCode == 'OK') {
        alert('Institude Profile added successfully');
      }

    });

    localStorage.setItem('institute-detail', JSON.stringify(this.institute));
  }

}


