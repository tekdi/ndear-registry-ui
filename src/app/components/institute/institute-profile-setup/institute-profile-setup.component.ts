import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-institute-profile-setup',
  templateUrl: './institute-profile-setup.component.html',
  styleUrls: ['./institute-profile-setup.component.scss']
})
export class InstituteProfileSetupComponent implements OnInit {
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
          "instututeType"
        ],
        "properties": {
          "instituteName": {
            "type": "string"
          },
          "logoUrl": {
            "type": "string"
          },
          "Address": {
            "type": "string"
          },
          "pincode": {
            "type": "number"
          },
          "instututeType": {
            "type": "string",
            "enum": [
              "School",
              "Collage",
              "Coaching"
            ]
          }
        }
      },

      "WhatIsYourRole": {
        "type": "object",
        "required": [
          "role",
          "soul"
        ],
        "properties": {
          "role":{
            "type": "string",
            "enum": [
              "Head of department",
              "Principle"
            ]
          },
          "soul": {
            "title": " I am Admin",
            "type": "boolean",
            "default": true
          }
        }
      },
      "WhoIsAdmin": {
        "type": "object",
        "properties": {
          "emailOrMobile":{
            "title": "Email id or Mobile",
            "type": "string"
          }
        }
      }
    },
    "properties": {
      "BasicDetails": {
        "$ref": "#/definitions/BasicDetails"
      },
      "WhatIsYourRole": {
        "title": "What is your role?",
        "$ref": "#/definitions/WhatIsYourRole"
      },
      "WhoIsAdmin": {
        "title": " Who is the admin of your institute?",
        "$ref": "#/definitions/WhoIsAdmin"
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
  constructor(public router: Router) { }

  ngOnInit(): void {

  }
  yourOnSubmitFn(data){
    console.log(data)
    localStorage.setItem('institute-detail',JSON.stringify(data));
    this.router.navigate(['mail']);
  }

}