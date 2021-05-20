import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-institute-setup',
  templateUrl: './admin-institute-setup.component.html',
  styleUrls: ['./admin-institute-setup.component.css']
})
export class AdminInstituteSetupComponent implements OnInit {
  schema = {
    "type": "object",
    "title": "Teacher",
    "definitions": {
      "BasicDetails": {
        "type": "object",
        "required": [
          "instituteName",
          "Address",
          "pincode",
          "Village",
          "InstitueDistrict",
          "InstitueState",
          "ContactNumber",
          "Email",
          "instututeType",
          "SchoolType",
          "ManagementOfInstitute",
          "YearOfEstablishmentOfInstitute"
        ],
        "properties": {
          "instituteName": {
            "type": "string"
          },
          "logoUrl": {
            "type": "file"
          },
          "Address": {
            "type": "string"
          },
          "pincode": {
            "type": "number"
          },
          "Village": {
            "type": "string"
          },
          "InstitueDistrict": {
            "type": "string"
          },
          "InstitueState": {
            "type": "string"
          },
          "ContactNumber": {
            "type": "number"
          },
          "Email": {
            "type": "string"
          },
          "Website": {
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

      "IDDetails": {
        "type": "object",
        "required": [
          "AffiliationNumber"
        ],
        "properties": {
          "AffiliationNumber": {
            "title": "Affiliation Number",
            "type": "number"
          }
        }
      }
    },
    "properties": {
      "BasicDetails": {
        "$ref": "#/definitions/BasicDetails"
      }
    }
  };
 
  form: [
    "*",
    {
      "type": "submit",
      "style": "btn btn-primary text-end mt-3 fw-bold text-capitalize",
      "title": "save"
    }
  ]
  data;
  header1: string = 'plain';
  constructor(public router: Router) { }

  ngOnInit(): void {
    localStorage.setItem('consent','[]');
    this.data = JSON.parse(localStorage.getItem('institute-detail'))
  }
  yourOnSubmitFn(data){
    console.log(data)
    localStorage.setItem('institute-detail',JSON.stringify(data));
    this.router.navigate(['institute-profile']);
  }

}