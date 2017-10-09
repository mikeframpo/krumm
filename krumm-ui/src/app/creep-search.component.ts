import { Component, OnInit } from "@angular/core";
import { CreepService } from "./creep.service";
import { Creep } from "./creep";
import { SearchParams } from "./search-params";
import { SearchResponse } from "./search-response";


@Component({
  templateUrl: 'creep-search.component.html'
})
export class CreepSearchComponent implements OnInit {

  private creeps: object[];
  private pages: number[];
  private currentPage: number;

  private searchParams: SearchParams;

  constructor(private creepService: CreepService) { }

  ngOnInit(): void {
    this.searchParams = new SearchParams();
    this.searchCreeps();
  }

  searchCreeps(): void {
    this.creepService.searchCreeps(this.searchParams)
    .then(response => {
      this.creeps = response.creeps;
      this.pages = Array(response.num_pages).fill(0).map((x,i) => i+1);
      this.currentPage = response.page;
    });
  }
}
