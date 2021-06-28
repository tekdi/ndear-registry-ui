import { Injectable } from '@angular/core';
import { DataService } from '../data/data-request.service';
import { environment, ApiPaths } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscoveryService {
  baseUrl = environment.baseUrl;

  constructor(public dataService: DataService) { }

  searchInstitute(filters){    
      let url = `${this.baseUrl}/${ApiPaths.searchInstitute}`;
      const req = {
        url: url,
        data: filters
      };
  
        return this.dataService.post(req);
  }

  searchTeacher(filters){    
    let url = `${this.baseUrl}/${ApiPaths.searchTeacher}`;
    const req = {
      url: url,
      data: filters
    };

      return this.dataService.post(req);
}

searchStudent(filters){    
  let url = `${this.baseUrl}/${ApiPaths.searchStudent}`;
  const req = {
    url: url,
    data: filters
  };

    return this.dataService.post(req);
}

}
