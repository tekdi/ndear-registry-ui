import { Injectable } from '@angular/core';
import { DataService } from '../../services/data/data-request.service';
import { environment, ApiPaths } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AttestationService {
   baseUrl = environment.baseUrl;
   studentEntityId : string;
   studentEntity: any;

  constructor(public dataService: DataService) {

  }

  getAttestations(entityName) {

    const req = {
      url: `${this.baseUrl}` + '/' + entityName + '/claims'
    };

    return this.dataService.get(req);

  }

  attastedByTeacher(entity,  action, note) {
    let url = `${this.baseUrl}` + '/Teacher/' + entity.entityId + '/claims/' + entity.claimId + '/attest';

    // if (entity == 'teacher') {
    //    url = `${this.baseUrl}/${ApiPaths.teacherGrantDenyClaims}`;
    
    // } else if (entity == 'student') {
    //    url = `${this.baseUrl}/${ApiPaths.studentGrantDenyClaims}`;


    // } else {
    //    url = `${this.baseUrl}/${ApiPaths.instituteGrantDenyClaims}`;
    // }

    const req = {
      url: url,
      data : {
        "action": action,
        "notes": note
    }
    };

    return this.dataService.post(req);

  }

  getStudentProfile(id) {
    let url = `${this.baseUrl}/${ApiPaths.Student}/` + id;
    const req = {
      url: url
    };

    return this.dataService.get(req);
  }

  returnEntityId(){
    return this.studentEntityId
  }

  grantDenyAttestation(entity,  action, note){
    return [];

  }

}
