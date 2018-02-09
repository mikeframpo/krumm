import { Component, OnInit } from '@angular/core';
import { CreepService } from './creep.service';
import { Creep } from './creep';
import { SearchResponse } from './search-response';
import { Router, ActivatedRoute, ParamMap, NavigationEnd, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Utils } from './utils';


@Component({
  templateUrl: 'creep-search.component.html'
})
export class CreepSearchComponent {

  creeps: Creep[];
  num_creeps: number;
  num_creeps_per_page: number;
  creepTypes: string[];

  nameQuery: string;
  currentPage: number;
  creepType: string;
  crMin: string;
  crMax: string;

  constructor(private creepService: CreepService,
              private route: ActivatedRoute,
              private router: Router) {

    this.currentPage = 1;

    this.route.queryParamMap.subscribe((queryParamMap: ParamMap) => {
      this.nameQuery = queryParamMap.get('name');
      this.currentPage = +queryParamMap.get('page') || 1;
      this.creepType = queryParamMap.get('type');
      this.crMin = queryParamMap.get('crmin');
      this.crMax = queryParamMap.get('crmax');

      this.queryCreeps();
      this.getCreepTypes();
    });
  }

  searchCreeps(): void {
    this.router.navigate([],
                        {
                          relativeTo: this.route,
                          queryParams: {
                            name: this.nameQuery || null,
                            type: this.creepType || null,
                            crmin: this.crMin || null,
                            crmax: this.crMax || null,
                           },
                          queryParamsHandling: ''
                        });
  }

  setPage(pageNum: number): void {
    this.router.navigate([],
      {
        relativeTo: this.route,
        queryParams: {
          page: pageNum
        },
        queryParamsHandling: 'merge'
      });
  }

  queryCreeps(): void {

    const searchParams = {
      nameQuery: this.nameQuery,
      page: this.currentPage,
      type: this.creepType,
      crMin: this.crMin,
      crMax: this.crMax,
    };

    this.creepService.searchCreeps(searchParams)
      .then(response => {
        this.creeps = response.creeps;
        this.num_creeps = response.num_creeps;
        this.num_creeps_per_page = response.num_creeps_per_page;
      });
  }

  getCreepTypes(): void {
    this.creepService.getCreatureTypes()
      .subscribe(creepTypes => this.creepTypes = creepTypes);
  }

  getCreepSubtitle(creep): string {
    return creep.size + ' ' + creep.type + ', ' + creep.alignment;
  }
}
