import { Injectable } from "@angular/core";
import { Creep } from "./creep";

import { Http } from "@angular/http";

import 'rxjs/add/operator/toPromise';
import { SearchResponse } from "./search-response";

const creepUrlBase = 'http://127.0.0.1:8000';
const creepByIdUrl = creepUrlBase + '/creeps/id';
const creepQueryUrl = creepUrlBase + '/creeps/query?fields=id,name';
const creepTypesUrl = creepUrlBase + '/creeps/meta/types';

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

  searchCreeps(searchParams): Promise<SearchResponse> {

    let urlParts = [creepQueryUrl];
    if (searchParams.nameQuery) {
      urlParts.push('&name=' + searchParams.nameQuery.toLowerCase());
    }
    if (searchParams.type) {
      urlParts.push('&type=' + searchParams.type.toLowerCase());
    }
    if (searchParams.page) {
      urlParts.push('&page=' + searchParams.page);
    }
    if (searchParams.crMin) {
      urlParts.push('&crmin=' + searchParams.crMin);
    }
    if (searchParams.crMax) {
      urlParts.push('&crmax=' + searchParams.crMax);
    }
    let url = urlParts.join('');

    return this.http.get(url)
      .toPromise()
      .then(response => {
        return (response.json() as SearchResponse);
      });
  }

  getCreatureTypes(): Promise<string[]> {
    return this.http.get(creepTypesUrl)
      .toPromise()
      .then(response => response.json() as string[]);
  }
}