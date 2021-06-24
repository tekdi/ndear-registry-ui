import { Injectable } from '@angular/core';
import { DataService } from '../data/data-request.service';
import { environment, ApiPaths } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscoveryService {
  baseUrl = environment.baseUrl;

  constructor(public dataService: DataService) { }

  searchfilter(filters){    
      let url = `${this.baseUrl}/${ApiPaths.searchInstitute}`;
      const req = {
        url: url,
        data: filters
      };
  
        return this.dataService.post(req);
  }

}
