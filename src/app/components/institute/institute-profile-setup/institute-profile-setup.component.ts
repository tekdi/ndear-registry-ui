import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-institute-profile-setup',
  templateUrl: './institute-profile-setup.component.html',
  styleUrls: ['./institute-profile-setup.component.scss']
})
export class InstituteProfileSetupComponent implements OnInit {
  header1: string = 'plain';
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
          "Address": {
            "type": "string"
          },
          "pincode": {
            "type": "number"
          },
          
        }
      },

      "WhatIsYourRole": {
        "type": "object",
        "required": [
          "role"
        ],
        "properties": {
          "role":{
            "type": "string",
            "enum": [
              "Head of department",
              "Principal"
            ]
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
    localStorage.setItem('admin-setup',"true");
    localStorage.setItem('institute-detail',JSON.stringify(data));
    const url = this.router.createUrlTree(['/mail'])
    window.open(url.toString(), '_blank')
    this.router.navigate(['institute-profile-select']);
  }

}