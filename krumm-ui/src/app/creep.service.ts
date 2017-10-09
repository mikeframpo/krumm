import { Injectable } from "@angular/core";
import { Creep } from "./creep";

import { Http } from "@angular/http";

import 'rxjs/add/operator/toPromise';
import { SearchParams } from "./search-params";
import { SearchResponse } from "./search-response";

const creepUrlBase = 'http://127.0.0.1:8000';
const creepByIdUrl = creepUrlBase + '/creeps/id';
const creepQueryUrl = creepUrlBase + '/creeps/query?fields=id,name';

@Injectable()
export class CreepService {

  constructor(private http: Http) { }

  getCreep(id: number): Promise<Creep> {
    const url = `${creepByIdUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return response.json() as Creep;
      });
  }

  searchCreeps(searchParams: SearchParams): Promise<SearchResponse> {

    let urlParts = [creepQueryUrl];
    if (searchParams.name) {
      urlParts.push('&name=' + searchParams.name.toLowerCase());
    }
    let url = urlParts.join('');

    return this.http.get(url)
      .toPromise()
      .then(response => {
        return (response.json() as SearchResponse);
      });
  }
}