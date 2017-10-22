import { Component, OnInit, Input } from "@angular/core";

import { Creep } from './creep';
import { Utils } from './utils';
import { getStatModLookup, skillNames, abilities } from "./stats";
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

  private toSignedNum(val: number): string {
    if (val < 0) {
      return val.toString();
    } else {
      return '+' + val.toString();
    }
  }

  // cache the value
  skills: string[] = null;

  getSkills(): string[] {
    if (!this.skills) {
      let skills = [];
      for (let skillName of skillNames) {
        if (this.creep[skillName]) {
          skills.push({
            name: Utils.toTitleCase(skillName),
            val: this.toSignedNum(this.creep[skillName])
          });
        }
      }
      this.skills = skills;
    }
    return this.skills;
  }

  saves: string[] = null;

  getSaves(): string[] {
    if (!this.saves) {
      let saves = [];
      for (let ability of abilities) {
        let throwKey = ability + '_save';
        if (this.creep[throwKey]) {
          saves.push({
            name: Utils.toTitleCase(ability.slice(0, 3)),
            val: this.toSignedNum(this.creep[throwKey])
          })
        }
      }
      this.saves = saves;
    }
    return this.saves;
  }

  getChallengeRating(): string {
    let cr = this.creep.cr_num.toString();
    if (this.creep.cr_den > 1) {
      cr += '/' + this.creep.cr_den.toString();
    }
    return cr;
  }
}