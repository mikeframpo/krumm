import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";

import 'rxjs/add/operator/switchMap';

import { Creep } from "./creep";
import { CREEP } from "./creep-mocked";
import { CreepService } from "./creep.service";

@Component({
  template: `
    <div class="container-fluid">
      <stat-block *ngIf="creep && !editMode" [creep]=creep></stat-block>
      <edit-creep *ngIf="creep && editMode" [creep]=creep></edit-creep>
      <button class="btn" (click)="onClickEdit()">Toggle edit</button>
    </div>
  `
})
export class CreepDisplayComponent implements OnInit {
  
  creep: Creep;
  editMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private creepService: CreepService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.creepService.getCreep(+params['id'])
        .then((creep) => {this.creep = creep});
    })
  }

  onClickEdit(): void {
    this.editMode = !this.editMode;
  }
}