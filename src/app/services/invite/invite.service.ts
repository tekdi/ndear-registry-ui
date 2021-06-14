import { Injectable } from '@angular/core';
import { DataService } from '../data/data-request.service';
import { environment, ApiPaths } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InviteService {

  baseUrl = environment.baseUrl;
  constructor(public dataService: DataService) {
  }

  inviteStudent(data) {
    let url = `${this.baseUrl}/${ApiPaths.InviteStudent}`;
    const req = {
      url: url,
      data: data
    };

    return this.dataService.post(req);
  }

  inviteTeacher(data) {
    let url = `${this.baseUrl}/${ApiPaths.InviteTeacher}`;
    const req = {
      url: url,
      data: data
    };

    return this.dataService.post(req);
  }

  inviteInstitute(data) {
    let url = `${this.baseUrl}/${ApiPaths.InviteInstitute}`;
    const req = {
      url: url,
      data: data
    };

    return this.dataService.post(req);
  }

 
}
