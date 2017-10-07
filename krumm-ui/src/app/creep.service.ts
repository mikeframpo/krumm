import { Injectable } from "@angular/core";
import { Creep } from "./creep";

import { Http } from "@angular/http";

import 'rxjs/add/operator/toPromise';

const creepUrlBase = 'http://127.0.0.1:8000';

@Injectable()
export class CreepService {

  private creepByIdUrl = creepUrlBase + '/creeps/id';
  private creepNamesUrl = creepUrlBase + '/creeps/query?fields=id,name';

  constructor(private http: Http) { }

  getCreep(id: number): Promise<Creep> {
    const url = `${this.creepByIdUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return response.json() as Creep;
      });
  }

  getCreepNames(): Promise<Creep[]> {
    return this.http.get(this.creepNamesUrl)
      .toPromise()
      .then(response => {
        return (response.json() as Creep[]);
      });
  }
}