import { Injectable } from "@angular/core";
import { Creep } from "./creep";

import { Http } from "@angular/http";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CreepService {

  private creepUrl = 'http://127.0.0.1:8000/creeps/id';

  constructor(private http: Http) { }

  getCreep(id: number): Promise<Creep> {
    const url = `${this.creepUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return response.json() as Creep;
      });
  }
}