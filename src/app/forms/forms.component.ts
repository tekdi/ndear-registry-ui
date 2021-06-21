import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SchemaService } from '../services/data/schema.service';
import * as FormSchemas from './forms.json'
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { JSONSchema7 } from "json-schema";
import { GeneralService } from '../services/general/general.service';
import { PanelsComponent } from '../layouts/modal/panels/panels.component';
import { Location } from '@angular/common'
import { title } from 'process';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
  @Input() form;
  @Input() modal;
  @Input() identifier;
  formSchema;
  responseData;
  schemaloaded = false;
  schema: JSONSchema7 = {
    "type": "object",
    "title": "",
    "definitions": {},
    "properties": {}
  };
  definations = {};
  property = {};
  ordering;
  required = [];

  form2: FormGroup;
  model = {};
  options: FormlyFormOptions;
  fields: FormlyFieldConfig[];
  customFields = [];

  type: string;
  apiUrl: string;
  redirectTo: any;
  constructor(private route: ActivatedRoute, public router: Router, public schemaService: SchemaService, private formlyJsonschema: FormlyJsonschema, public generalService: GeneralService, private location: Location) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log('params', params)
      // this.form = params['form']

      if (params['form'] != undefined) {
        this.form = params['form']
      }
      if (params['id'] != undefined) {
        this.identifier = params['id']
      }
      if (params['modal'] != undefined) {
        this.modal = params['modal']
      }

    });
    // console.log("modallll", this.modal)
    var filtered = FormSchemas.forms.filter(obj => {
      console.log(Object.keys(obj)[0])
      return Object.keys(obj)[0] === this.form
    })
    this.formSchema = filtered[0][this.form]
    
    if(this.formSchema.api){
      this.apiUrl = this.formSchema.api;
    }
    if(this.formSchema.redirectTo){
      this.redirectTo = this.formSchema.redirectTo;
    }
    if (this.identifier != null) {
      this.getData()
    }
    if (this.formSchema.type) {
      this.type = this.formSchema.type
    }
    this.schemaService.getSchemas().subscribe((res) => {
      this.responseData = res;
      console.log("this.responseData", this.responseData);
      // console.log("formSchema",this.formSchema);
      this.formSchema.fieldsets.forEach(fieldset => {
        this.definations[fieldset.definition] = {}
        this.definations[fieldset.definition]['type'] = "object";
        if (fieldset.title) {
          this.definations[fieldset.definition]['title'] = fieldset.title
        }
        if (fieldset.required && fieldset.required.length > 0) {
          this.definations[fieldset.definition]['required'] = fieldset.required
        }
        this.definations[fieldset.definition].properties = {}
        this.property[fieldset.definition] = {}
        this.property = this.definations[fieldset.definition].properties;
        // console.log('ppppp', this.definations[fieldset.definition].properties)
        // if(this.definations[fieldset.definition].required && this.definations[fieldset.definition].required.length > 0){
        //   this.schema['required'] = this.definations[fieldset.definition].required
        // }
        if(fieldset.formclass){
          this.schema['widget'] = {};
          this.schema['widget']['formlyConfig'] = { fieldGroupClassName: fieldset.formclass }
        }
        if (fieldset.fields[0] === "*") {
          this.definations = this.responseData.definitions;
          this.property[fieldset.definition] = {
            "title": fieldset.title,
            "$ref": "#/definitions/" + fieldset.definition
          };
        } else {
          this.addFields(fieldset)
        }
      });
      this.ordering = this.formSchema.order;
      this.schema["type"] = "object";
      this.schema["title"] = this.formSchema.title;
      this.schema["definitions"] = this.definations;
      this.schema["properties"] = this.property;
      this.schema["required"] = this.required
      // console.log(this.schema)

      this.loadSchema();
    });


  }

  loadSchema() {
    console.log("schema", this.schema)
    this.form2 = new FormGroup({});
    this.options = {};
    this.fields = [this.formlyJsonschema.toFieldConfig(this.schema)];
    // this.model = {};
    this.schemaloaded = true;
  }

  addFields(fieldset) {
    fieldset.fields.forEach(field => {
      
      if (field.children) {
        
        this.definations[field.children.definition] = this.responseData.definitions[field.children.definition];
        var ref_properties = {}
        var ref_required = []
        if (field.children.fields && field.children.fields.length > 0) {
          field.children.fields.forEach(reffield => {
            this.addWidget(field.children, reffield)
            if (reffield.required) {
              ref_required.push(reffield.name)
            }
            ref_properties[reffield.name] = this.responseData.definitions[field.children.definition].properties[reffield.name];
            
            // this.property[field.children.definition].properties[reffield.name] = this.responseData.definitions[field.children.definition].properties[reffield.name];
          });
          // this.property[field.name] = ref_properties;
          this.responseData.definitions[fieldset.definition].properties[field.name].properties = ref_properties;
          this.definations[field.children.definition].properties = ref_properties;
          this.definations[field.children.definition].required = ref_required;
        }
      }
      if(field.custom && field.element){
        this.responseData.definitions[fieldset.definition].properties[field.name] = field.element;
        this.customFields.push(field.name)
        console.log("mod",this.model)
      }else{
        this.addWidget(fieldset, field)
      }
      
      this.definations[fieldset.definition].properties[field.name] = this.responseData.definitions[fieldset.definition].properties[field.name];
      if(field.children && !field.children.title){
        if(this.property[field.name].title){
          delete this.property[field.name].title;
        }
        if(this.property[field.name].description){
          delete this.property[field.name].description;
        }
        
      }
    });
  }

  addWidget(fieldset, field) {

    this.responseData.definitions[fieldset.definition].properties[field.name]['widget'] = {
      "formlyConfig": {
        "templateOptions": {},
        "validation": {},
        "expressionProperties":{}
      }
    }
    if (field.classGroup) {
      this.responseData.definitions[fieldset.definition].properties[field.name]['widget']['formlyConfig']['fieldGroupClassName'] = field.classGroup;
    }
    if (field.class) {
      this.responseData.definitions[fieldset.definition].properties[field.name]['widget']['formlyConfig']['className'] = field.class;
    }
    if (field.required || field.children) {
      this.responseData.definitions[fieldset.definition].properties[field.name]['widget']['formlyConfig']['templateOptions']['required'] = field.required;
    }
    if (field.children) {
      this.responseData.definitions[fieldset.definition].properties[field.name]['widget']['formlyConfig']['templateOptions']['required'] = true;
    }
    if (field.validation) {
      if (field.validation.message) {
        this.responseData.definitions[fieldset.definition].properties[field.name]['widget']['formlyConfig']['validation'] = {
          "messages": {
            "pattern": field.validation.message
          }
        }
        if (field.validation.pattern) {
          this.responseData.definitions[fieldset.definition].properties[field.name]['pattern'] = field.validation.pattern;
        }
      }
      if (field.type) {
        this.responseData.definitions[fieldset.definition].properties[field.name]['widget']['formlyConfig']['type'] = field.type
      }
      if (field.disabled || field.disable) {
        this.responseData.definitions[fieldset.definition].properties[field.name]['widget']['formlyConfig']['templateOptions']['disabled'] = field.disabled
      };
    }
    // console.log("field", field)
  }

  submit() {
    console.log("model",this.model,this.type,this.identifier)
    this.customFields.forEach(element => {
      delete this.model[element];
    });
    if(this.type && this.type === 'entity'){
      if (this.identifier != null) {
        this.updateData()
      } else {
        this.postData()
      }
      // this.getData()
    }
    else if(this.type && this.type.includes("property")){
      this.identifier = localStorage.getItem('entity-osid');
      var property = this.type.split(":")[1];
      var url = [this.apiUrl,this.identifier,property];
      this.apiUrl = url.join("/");
      this.model = this.model[property];
      this.postData()
      // this.getData()
    }
    this.router.navigateByUrl(this.redirectTo)
  }

  getData() {
    this.identifier = localStorage.getItem('entity-osid');
    this.generalService.getData(this.apiUrl, this.identifier).subscribe((res) => {
      console.log({ res });
      this.model = res

    });
  }

  postData() {
    this.generalService.postData(this.apiUrl, this.model).subscribe((res) => {
      console.log({ res });
      if (res.responseCode == 'OK') {
        var entity = this.apiUrl.split('/')[1]
        // alert('Data added successfully : ' + JSON.stringify(res.result));
        console.log("resp--",res.result[entity],entity)
        localStorage.setItem('entity-osid', res.result[entity].osid);
        // const url = this.router.createUrlTree(['/profile/institute'])
        // window.open(url.toString(), '_blank')
      } else {
        alert(res.params.errmsg);
      }
    });
  }

  updateData() {
    this.generalService.putData(this.apiUrl, this.identifier, this.model).subscribe((res) => {
      if (res.params.status == 'SUCCESSFUL') {
        alert('Data updated successfully');
      }
      else{
        alert(res.params.status);
      }
    });
  }

  // close() {
  //   this.location.back()
  //   // this.panel.close();
  // }
}
