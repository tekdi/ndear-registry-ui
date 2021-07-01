import { Injectable } from '@angular/core';
import { DataService } from '../../services/data/data-request.service';
import { environment, ApiPaths } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AttestationService {
   baseUrl = environment.baseUrl;

  constructor(public dataService: DataService) {

  }

  getAttestations(entityName) {

    const req = {
      url: `${this.baseUrl}` + '/' + entityName + '/claims'
    };

    return this.dataService.get(req);

  }

  grantDenyAttestation(entity,  action, note) {
    let url;

    if (entity == 'teacher') {
       url = `${this.baseUrl}/${ApiPaths.teacherGrantDenyClaims}`;
    
    } else if (entity == 'student') {
       url = `${this.baseUrl}/${ApiPaths.studentGrantDenyClaims}`;


    } else {
       url = `${this.baseUrl}/${ApiPaths.instituteGrantDenyClaims}`;
    }

    const req = {
      url: url,
      data : {
        "action": action,
        "notes": note
    }
    };

    return this.dataService.post(req);

  }

}
