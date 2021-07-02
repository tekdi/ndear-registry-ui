import { Injectable } from '@angular/core';
import { DataService } from '../data/data-request.service';
import { environment, ApiPaths } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeacherProfileService {

  baseUrl = environment.baseUrl;

  constructor(public dataService: DataService) {
  }

  postTeacherProfile(data) {
    let url = `${this.baseUrl}/${ApiPaths.Teacher}`;
    const req = {
      url: url,
      data: data
    };

      return this.dataService.post(req);
    
  }

  addProperty(data, id, property) {
    
    let url = `${this.baseUrl}/${ApiPaths.Teacher}/` + id + '/' + property;
    const req = {
      url: url,
      data: data
    };

      return this.dataService.post(req);
    
  }

  getTeacherProfile(id) {
    let url = `${this.baseUrl}/${ApiPaths.Teacher}`;
    const req = {
      url: url
    };

    return this.dataService.get(req);
  }

  putTeacherProfile(data, id) {
    let url = `${this.baseUrl}/${ApiPaths.Teacher}/${id}`;
    const req = {
      url: url,
      data: data
    };

      return this.dataService.put(req);
    
  }

  sendAttestedTeacherProperty(entityId, propertyId, property) {
    let url = `${this.baseUrl}/${ApiPaths.Teacher}/` + entityId + '/send/' + property + '/' + propertyId;
    const req = {
      url: url
    };

    return this.dataService.post(req);

  }



}

