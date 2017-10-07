import { Component, OnInit } from "@angular/core";
import { CreepService } from "./creep.service";
import { Creep } from "./creep";


@Component({
  template: `
    <div *ngIf="creeps">
      <div *ngFor="let creep of creeps">
        <a routerLink="/creep/id/{{creep.id}}">{{creep.name}}</a>
      </div>
    </div>
  `
})
export class CreepListComponent implements OnInit {

  private creeps: Creep[];

  constructor(private creepService: CreepService) { }

  ngOnInit(): void {
    this.creepService.getCreepNames()
      .then(creeps => {
        this.creeps = creeps;
      });
  }
}
