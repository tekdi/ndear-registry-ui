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
          "pincode"
        ],
        "properties": {
          "instituteName": {
            "type": "string"
          },
          "logoUrl": {
            "type": "string",
          },
          "Address": {
            "type": "string"
          },
          "pincode": {
            "type": "number"
          }
          
        }
      },

      "IDDetails": {
        "type": "object",
        "required": [
          "instututeType",
          "AffiliationNumber"
        ],
        "properties": {
          "instututeType": {
            "type": "string",
            "enum": [
              "School",
              "Collage",
              "Coaching"
            ]
          },
          "AffiliationNumber": {
            "title": "Affiliation Number",
            "type": "number"
          },
          "ABCIdNUmber": {
            "title": "ABC ID NUmber",
            "type": "string"
          }
        }
      }
    },
    "properties": {
      "BasicDetails": {
        "$ref": "#/definitions/BasicDetails"
      },
      "IDDetails": {
        "title": "ID Details",
        "$ref": "#/definitions/IDDetails"
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
  constructor(public router: Router) { }

  ngOnInit(): void {
    this.data = JSON.parse(localStorage.getItem('institute-detail'))
  }
  yourOnSubmitFn(data){
    console.log(data)
    localStorage.setItem('institute-detail',JSON.stringify(data));
    this.router.navigate(['institute-profile']);
  }

}