import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SchemaService } from '../services/data/schema.service';
import * as LayoutSchemas from './layouts.json'
import { GeneralService } from '../services/general/general.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormsComponent } from '../forms/forms.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent implements OnInit {
  layout: any;
  claim: any;
  responseData;
  schemaloaded = false;
  layoutSchema;
  apiUrl: any;
  identifier: any = null;
  model: any;
  Data: string[] = [];
  property: string[] = [];
  currentDialog = null;
  destroy = new Subject<any>();

  constructor(private route: ActivatedRoute, public schemaService: SchemaService, public generalService: GeneralService, private modalService: NgbModal,
    router: Router) { }

  ngOnInit(): void {
    // this.identifier = '1-ad91e30d-9ad9-4172-ba27-3fd805ad8a75'
    this.identifier = localStorage.getItem('entity-osid')
    this.route.params.subscribe(params => {
      console.log(params)
      this.layout = params['layout']
      if (params['claim']) {
        this.claim = params['claim']
      }
    });
    this.schemaService.getSchemas().subscribe(async (res) => {
      this.responseData = res;
      console.log("this.responseData", this.responseData);
      var filtered = LayoutSchemas.layouts.filter(obj => {
        console.log(Object.keys(obj)[0])
        return Object.keys(obj)[0] === this.layout
      })
      console.log(filtered)
      this.layoutSchema = filtered[0][this.layout]
      this.apiUrl = this.layoutSchema.api;
      if (this.identifier && this.identifier != null) {
        await this.getData();
      }
    })
  }

  addData() {
    this.layoutSchema.blocks.forEach(block => {
      this.property = []
      block['items'] = [];
      var temp_object;
      if (block.fields.includes && block.fields.includes.length > 0) {
        if (block.fields.includes == "*") {
          console.log("this.model", this.model)
          for (var element in this.model) {
            if (typeof this.model[element] == "object") {
              for (const [key, value] of Object.entries(this.model[element])) {
                if ('$ref' in this.responseData['definitions'][block.definition]['properties'][element]) {
                  var ref_defination = (this.responseData['definitions'][block.definition]['properties'][element]['$ref']).split('/').pop()
                  temp_object = this.responseData['definitions'][ref_defination]['properties'][key]

                  // this.property[key] = this.responseData['definitions'][ref_defination]['properties'][key]
                  if (temp_object != undefined) {
                    temp_object['value'] = value
                    console.log("here", temp_object[key])
                    this.property.push(temp_object)
                  }


                }
                else {
                  console.log("eeeeee",element)
                  temp_object = this.responseData['definitions'][block.definition]['properties'][element]['properties'][key]

                  // this.property[key] = this.responseData['definitions'][block.definition]['properties'][element];
                  if (temp_object != undefined) {
                    temp_object['value'] = value
                    console.log("here", temp_object[key])
                    this.property.push(temp_object)
                  }

                }
                // console.log((this.responseData['definitions'][block.definition]['properties'][element]['$ref']).split('/').pop())
                // this.property[key] = value
              }
            }
            else {
              temp_object = this.responseData['definitions'][block.definition]['properties'][element]

              // this.property[element] = this.responseData['definitions'][block.definition]['properties'][element]
              if (temp_object != undefined) {
                temp_object['value'] = this.model[element]
                console.log("here2", this.property[element])
                this.property.push(temp_object)
              }

              // console.log(this.responseData['definitions'][block.definition])
              // this.property[element] = this.model[element]
            }
          }

        }
        else {
          block.fields.includes.forEach(element => {
            if (typeof this.model[element] == "object") {
              for (const [key, value] of Object.entries(this.model[element])) {
                // this.property[key] = value
                if ('$ref' in this.responseData['definitions'][block.definition]['properties'][element]) {
                  var ref_defination = (this.responseData['definitions'][block.definition]['properties'][element]['$ref']).split('/').pop()
                  temp_object = this.responseData['definitions'][ref_defination]['properties'][key]


                  // this.property[key] = this.responseData['definitions'][ref_defination]['properties'][key]
                  if (temp_object != undefined) {
                    temp_object['value'] = value
                    console.log("here", temp_object[key])
                    this.property.push(temp_object)
                  }

                }
                else {
                  temp_object = this.responseData['definitions'][block.definition]['properties'][element]

                  // this.property[key] = this.responseData['definitions'][block.definition]['properties'][element];
                  if (temp_object != undefined) {
                    temp_object['value'] = value
                    console.log("here", temp_object[key])
                    this.property.push(temp_object)
                  }

                }
              }
            }
            else {
              // this.property[element] = this.model[element]
              temp_object = this.responseData['definitions'][block.definition]['properties'][element]

              // this.property[element] = this.responseData['definitions'][block.definition]['properties'][element]
              if (temp_object != undefined) {
                temp_object['value'] = this.model[element]
                console.log("here2", this.property[element])
                this.property.push(temp_object)
              }

              // console.log(this.responseData['definitions'][block.definition])
            }
          });
        }
      }
      console.log(this.property)
      if (block.fields.excludes && block.fields.excludes.length > 0) {
        block.fields.excludes.forEach(element => {
          if (this.property.hasOwnProperty(element)) {
            delete this.property[element];
          }
        });
      }
      // this.removeCommonFields() 


      block.items.push(this.property)
      this.Data.push(block)
    })
    console.log("main", this.Data)
  }

  getData() {
    this.generalService.getData(this.apiUrl, this.identifier).subscribe((res) => {
      console.log({ res });
      this.model = res;
      this.addData()
    });
  }

  includeFields(fields) {
    fields.forEach(element => {
      if (typeof element == "object") {
        element.forEach(ref => {
          this.property[ref] = this.model[element][ref]
        });
      }
      else {
        this.property[element] = this.model[element]
      }
    });
  }

  removeCommonFields() {
    var commonFields = ['osCreatedAt', 'osCreatedBy', 'osUpdatedAt', 'osUpdatedBy', 'osid'];
    const filteredArray = this.property.filter(function (x, i) {
      return commonFields.indexOf(x[i]) < 0;
    });
    console.log("f", filteredArray)
    // commonFields.forEach(element => {
    //   console.log("pro",this.property)
    //   if(this.property.hasOwnProperty(element)){
    //     console.log("pro",this.property)
    //     // recentMovies.removeItem('Superman');
    //     delete this.property[element];
    //   }
    // });
  }

  openModal() {
    this.route.params.pipe(takeUntil(this.destroy)).subscribe(params => {
      // When router navigates on this component is takes the params
      // and opens up the photo detail modal
      let options: NgbModalOptions = {
        scrollable: true
      };
      this.currentDialog = this.modalService.open(FormsComponent, options);
      this.currentDialog.componentInstance.form = params.claim;
      this.currentDialog.componentInstance.modal = true;
      console.log('hse', params);

      // Go back to home page after the modal is closed
      this.currentDialog.result.then(
        result => {
          console.log('hello');
          // router.navigateByUrl(this.previousUrl);
        },
        reason => {
          // router.navigateByUrl(this.previousUrl);
        }
      );
    });
  }
  ngOnDestroy() {
    this.destroy.next();
  }

}
