import { Component } from "@angular/core";

import { Creep } from './creep';

@Component({
  selector: 'stat-block',
  templateUrl: 'statblock.component.html',
  styleUrls: ['statblock.component.css']
})
export class Statblock {

  creep: Creep = new Creep();
}