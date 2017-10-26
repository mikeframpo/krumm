import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { Creep } from './creep';
import { CreepService } from './creep.service';

@Component({
  template: `
    <div class="container-fluid">
      <app-stat-block *ngIf="creep" [creep]=creep></app-stat-block>
    </div>
  `
})
export class CreepDisplayComponent implements OnInit {

  creep: Creep;

  constructor(
    private route: ActivatedRoute,
    private creepService: CreepService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.creepService.getCreep(+params['id'])
        .then((creep) => { this.creep = creep; }
      );
    });
  }
}
