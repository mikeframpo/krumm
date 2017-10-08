import { Component, OnInit } from "@angular/core";
import { CreepService } from "./creep.service";
import { Creep } from "./creep";
import { SearchParams } from "./search-params";


@Component({
  templateUrl: 'creep-search.component.html'
})
export class CreepSearchComponent implements OnInit {

  private creeps: Creep[];
  private searchParams: SearchParams;

  constructor(private creepService: CreepService) { }

  ngOnInit(): void {
    this.searchParams = new SearchParams();
    this.searchCreeps();
  }

  searchCreeps(): void {
    this.creepService.searchCreeps(this.searchParams)
    .then(creeps => {
      this.creeps = creeps;
    });
  }
}
