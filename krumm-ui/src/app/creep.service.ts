import { Injectable } from '@angular/core';
import { Creep } from './creep';

import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { SearchResponse } from './search-response';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Utils } from './utils';

const creepUrlBase = 'http://127.0.0.1:8000';
const creepByIdUrl = creepUrlBase + '/creeps/id';
const creepQueryUrl = creepUrlBase + '/creeps/query?fields=id,name,size,type,alignment,challenge_rating';

const metaUrlBase = '/creeps/meta/';
const creepTypesUrl = creepUrlBase + metaUrlBase + 'types';
const creepSizesUrl = creepUrlBase + metaUrlBase + 'sizes';
const alignmentsUrl = creepUrlBase + metaUrlBase + 'alignments';

@Injectable()
export class CreepService {

  constructor(private http: Http) { }

  getCreep(id: number): Promise<Creep> {
    const url = `${creepByIdUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return Object.assign(new Creep(), response.json());
      });
  }

  searchCreeps(searchParams): Promise<SearchResponse> {

    const urlParts = [creepQueryUrl];
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
    const url = urlParts.join('');

    return this.http.get(url)
      .toPromise()
      .then(response => {
        return new SearchResponse(response.json());
      });
  }

  getFieldList(url: string): Observable<string[]> {
    return this.http.get(url)
      .map(response => (response.json() as string[])
        .map(item => Utils.toTitleCase(item)));
  }

  getCreatureTypes(): Observable<string[]> {
    return this.getFieldList(creepTypesUrl);
  }

  getCreatureSizes(): Observable<string[]> {
    return this.getFieldList(creepSizesUrl);
  }

  getAlignments(): Observable<string[]> {
    return this.getFieldList(alignmentsUrl);
  }
}
