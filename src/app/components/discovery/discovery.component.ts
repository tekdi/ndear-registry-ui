import { Component, OnInit } from '@angular/core';
import { SchemaService } from 'src/app/services/data/schema.service';
import { BoardInstituteService } from '../../services/board/board-institutes/board-institutes.service';

@Component({
  selector: 'app-discovery',
  templateUrl: './discovery.component.html',
  styleUrls: ['./discovery.component.css']
})
export class DiscoveryComponent implements OnInit {
  header1: string = 'main';
  searchInstitute;
  schemaJson;
  boardList;
  constructor(
    public schemaService: SchemaService,
    public boardInstituteService: BoardInstituteService
  ) { }

  ngOnInit(): void {


    this.schemaService.getSchemas().subscribe((res) => {
      this.schemaJson = res;

      this.searchInstitute = {
        "type": "object",
        "title": "Teacher",
        "definitions": {
          "Institute": {
            "type": "object",
            "properties": {
              "instituteType": {
                "type": "string",
                "enum": [
                  "Medical Education",
                  "Hotel Management Institute ",
                  "Chartered Management Institute "
                ]
              },
              "instituteName": {
                "type": "string",
                "enum": [
                  "Broad River University",
                  "Central Technical School",
                  "Oakwood School of Fine Arts90"
                ]
              }
            }
          },
          "Skills": {
            "type": "object",
            "properties": {
              "year": {
                "title": "Year",
                "type": "string",
                "enum": [
                  "2010",
                  "2000",
                  "1990"
                ]
              },
              "subject": {
                "title": "Subject",
                "type": "string",
                "enum": [
                  "English",
                  "Hindi",
                  "Sanskrit"
                ]
              }
            }
          },
          "Management": {
            "type": "object",
            "properties": {
              "year": {
                "title": "Year",
                "type": "string",
                "enum": [
                  "2010",
                  "2000",
                  "1990"
                ]
              },
              "subject": {
                "title": "Subject",
                "type": "string",
                "enum": [
                  "English",
                  "Hindi",
                  "Sanskrit"
                ]
              }
            }
          }
        },
        "properties": {
          "state": {
            "type": "string",
            "enum": [
              "Maharashtra",
              "Karnatka",
              "Other"
            ],
            "title": "State"
          },
          "district": {
            "type": "string",
            "enum": [
              "Nashik",
              "Pune",
              "Mumbai"
            ],
            "title": "district"
          },
          "Institute": {
            "$ref": "#/definitions/Institute"
          },
          "Skills": {
            "$ref": "#/definitions/Skills"
          },
          "Management": {
            "$ref": "#/definitions/Management"
          }
        }
      };
    });

    this.boardInstituteService.getBordInstitute().subscribe(res=>{
      this.boardList = res;
      console.log(this.boardList);
  
  
    }, (err)=>{
      console.log({err});
  
    });
  }

  onEditProfileSubmit(event) {
    console.log(event);
  }

  showDetails(){
    //alert('hi');
  }


}
