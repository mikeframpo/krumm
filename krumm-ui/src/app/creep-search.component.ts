import { Component, OnInit } from "@angular/core";
import { CreepService } from "./creep.service";
import { Creep } from "./creep";
import { SearchResponse } from "./search-response";
import { Router, ActivatedRoute, ParamMap, NavigationEnd, NavigationStart } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Utils } from "./utils";


@Component({
  templateUrl: 'creep-search.component.html'
})
export class CreepSearchComponent {

  private creeps: object[];
  private pages: number[];
  private creepTypes: string[];

  private nameQuery: string;
  private currentPage: string;
  private creepType: string;

  constructor(private creepService: CreepService,
              private route: ActivatedRoute,
              private router: Router) {

    this.currentPage = "1";

    this.route.queryParamMap.subscribe((queryParamMap: ParamMap) => {
      this.nameQuery = queryParamMap.get('name');
      this.currentPage = queryParamMap.get('page') || "1";
      this.creepType = queryParamMap.get('type');

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
                           },
                          queryParamsHandling: ''
                        });
  }

  queryCreeps(): void {

    let searchParams = {
      nameQuery: this.nameQuery,
      page: this.currentPage,
      type: this.creepType
    }

    this.creepService.searchCreeps(searchParams)
      .then(response => {
        this.creeps = response.creeps;
        this.pages = Array(response.num_pages).fill(0).map((x,i) => i+1);
      });
  }

  getCreepTypes(): void {
    this.creepService.getCreatureTypes()
      .then(types => {
        this.creepTypes
         = types.map(type => Utils.toTitleCase(type));
      });
  }
}