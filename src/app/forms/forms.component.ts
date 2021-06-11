import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchemaService } from '../services/data/schema.service';
import * as FormSchemas from './forms.json'
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { JSONSchema7 } from "json-schema";
import { GeneralService } from '../services/general/general.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
  @Input() form;
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
  model: any;
  options: FormlyFormOptions;
  fields: FormlyFieldConfig[];

  type: string;
  apiUrl: string;
  identifier = null;
  modal =false
  constructor(private route: ActivatedRoute, public schemaService: SchemaService, private formlyJsonschema: FormlyJsonschema, public generalService: GeneralService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log('params',Object.keys(params).length)
      // this.form = params['form']
      if(Object.keys(params).length == 0){
        this.modal = true;
      }else{
        
        if(params['form'] != undefined){
          this.form = params['form']
        }
        if(params['id'] != undefined){
          this.identifier = params['id']
        }
      }
    });
    console.log('modal',this.modal)
    this.schemaService.getSchemas().subscribe((res) => {
      this.responseData = res;
      console.log("this.responseData", this.responseData);
      var filtered = FormSchemas.forms.filter(obj => {
        console.log(Object.keys(obj)[0])
        return Object.keys(obj)[0] === this.form
      })
      this.formSchema = filtered[0][this.form]
      this.apiUrl = this.formSchema.api;
      if(this.identifier != null){
        this.getData()
      }
      // console.log("formSchema",this.formSchema);
      this.formSchema.fieldsets.forEach(fieldset => {
        this.definations[fieldset.definition] = {}
        this.definations[fieldset.definition]['type'] = "object";
        if (fieldset.title) {
          this.definations[fieldset.definition]['title'] = fieldset.title
        }
        // if(fieldset.order && fieldset.order.length > 0){
        //   this.definations[fieldset.definition]['order'] = fieldset.order
        // }
        if (fieldset.required && fieldset.required.length > 0) {
          this.definations[fieldset.definition]['required'] = fieldset.required
        }
        this.definations[fieldset.definition].properties = {}
        this.property[fieldset.definition] = {}
        this.property = this.definations[fieldset.definition].properties;
        console.log('ppppp',this.definations[fieldset.definition].properties)
        // if(this.definations[fieldset.definition].required && this.definations[fieldset.definition].required.length > 0){
        //   this.schema['required'] = this.definations[fieldset.definition].required
        // }
        if (fieldset.fields[0] === "*") {
          this.definations = this.responseData.definitions;
          this.property[fieldset.definition] = {
            "title": fieldset.title,
            "$ref": "#/definitions/"+fieldset.definition
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
    this.model = {};
    this.schemaloaded = true;
  }

  addFields(fieldset) {
    fieldset.fields.forEach(field => {
      this.addWidget(fieldset, field)
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
            // this.responseData.definitions[field.children.definition].properties[reffield.name].replace("Common.json/","")
            console.log("rrrrrrrrr",this.responseData.definitions[field.children.definition].properties[reffield.name])
            ref_properties[reffield.name] = this.responseData.definitions[field.children.definition].properties[reffield.name];
            // this.property[reffield.name] = this.responseData.definitions[field.children.definition].properties[reffield.name];
          });
          this.definations[field.children.definition].properties = ref_properties;
          this.definations[field.children.definition].required = ref_required;
        }
      }
      this.definations[fieldset.definition].properties[field.name] = this.responseData.definitions[fieldset.definition].properties[field.name];
    });
  }

  addWidget(fieldset, field) {

    this.responseData.definitions[fieldset.definition].properties[field.name]['widget'] = {
      "formlyConfig": {
        "templateOptions": {},
        "validation": {}
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
      console.log("field", field)
    }

    submit() {
      console.log(this.model)
      // alert(JSON.stringify(this.model));
      if(this.identifier != null){
        this.generalService.putData(this.apiUrl,this.identifier, this.model).subscribe((res) => {
          alert('Data updated successfully');
          this.getData()
        });
      }else{
        this.generalService.postData(this.apiUrl,this.model).subscribe((res) => {
          console.log({ res });
          if (res.responseCode == 'OK') {
            alert('Data added successfully : '+JSON.stringify(res.result));
          }else{
            alert(res.params.errmsg);
          }
    
        });
      }
    }

    getData(){
      this.generalService.getData(this.apiUrl,this.identifier).subscribe((res) => {
        console.log({ res });
        this.model = res
  
      });
    }

    // close() {
    //   this.panel.close();
    // }
  }
