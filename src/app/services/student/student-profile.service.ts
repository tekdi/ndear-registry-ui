import { Injectable } from '@angular/core';
import { DataService } from '../data/data-request.service';
import { environment, ApiPaths } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentProfileService {
  baseUrl = environment.baseUrl;


  constructor(public dataService: DataService) {
  }

  postStudentProfile(data) {
    let url = `${this.baseUrl}/${ApiPaths.Student}`;
    const req = {
      url: url,
      data: data
    };

    return this.dataService.post(req);
  }

  addProperty(data, id) {
    let url = `${this.baseUrl}/${ApiPaths.Student}/` + id + '/educationDetails';
    const req = {
      url: url,
      data: data
    };

    return this.dataService.post(req);
  }

  putStudentProfile(data, id) {
    let url = `${this.baseUrl}/${ApiPaths.Student}/` + id;
    const req = {
      url: url,
      data: data
    };


    return this.dataService.put(req);

  }

  getStudentProfile(id) {
    let url = `${this.baseUrl}/${ApiPaths.Student}`;
    const req = {
      url: url
    };

    return this.dataService.get(req);
  }


  sendAttestedStudentProperty(entityId, propertyId) {
    let url = `${this.baseUrl}/${ApiPaths.Student}/` + entityId + '/send/educationDetails/' + propertyId;
    const req = {
      url: url
    };

    return this.dataService.post(req);

  }


}

