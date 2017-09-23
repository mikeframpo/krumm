import { Component, OnInit } from "@angular/core";

import { Creep } from './creep';
import { getStatModLookup } from "./stats";
import { CreepService } from "./creep.service";

const noEditStyle: string = "creep-field-noedit";
const statNames: string[] = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];

@Component({
  selector: 'stat-block',
  templateUrl: 'statblock.component.html',
  styleUrls: ['statblock.component.css']
})
export class Statblock implements OnInit {

  constructor(private creepService: CreepService) { }

  ngOnInit(): void {
    this.creepService.getCreep(-1)
      .then(creep => this.creep = creep);
  }

  editable: boolean = false;
  creep: Creep;

  getEditStyle(): string {
    if (this.editable) {
      return "";
    }
    return noEditStyle;
  }

  toggleEditable(): void {
    this.editable = !this.editable;
  }

  getStatNames(): string[] {
    return statNames;
  }

  getStats(): string[] {
    let stats = [
      this.creep.strength,
      this.creep.dexterity,
      this.creep.constitution,
      this.creep.intelligence,
      this.creep.wisdom,
      this.creep.charisma
    ]
    return stats.map(
      item => item.toString() + '(' + getStatModLookup(item) + ')');
  }
}