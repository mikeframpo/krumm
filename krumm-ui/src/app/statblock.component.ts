import { Component, OnInit, Input } from "@angular/core";

import { Creep } from './creep';
import { getStatModLookup, skillNames } from "./stats";
import { CreepService } from "./creep.service";

const noEditStyle: string = "creep-field-noedit";
const statNames: string[] = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];

@Component({
  selector: 'stat-block',
  templateUrl: 'statblock.component.html',
  styleUrls: ['statblock.component.css']
})
export class StatblockComponent {

  @Input()
  creep: Creep;

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

  // cache the value
  skills: string[] = null;

  private toTitleCase(str: string): string {
    return str[0].toUpperCase() + str.slice(1);
  }

  getSkills(): string[] {
    if (!this.skills) {
      let skills = [];
      for (let skillName of skillNames) {
        if (this.creep[skillName]) {
          skills.push({
            name: this.toTitleCase(skillName),
            val: '+' + String(this.creep[skillName])
          });
        }
      }
      this.skills = skills;
    }
    return this.skills;
  }
}