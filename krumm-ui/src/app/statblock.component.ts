import { Component, OnInit, Input } from '@angular/core';

import { Creep } from './creep';
import { Utils } from './utils';
import { getStatModLookup, skillNames, abilities } from './stats';
import { CreepService } from './creep.service';

const noEditStyle = 'creep-field-noedit';
const statNames: string[] = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];

@Component({
  selector: 'app-stat-block',
  templateUrl: 'statblock.component.html',
  styleUrls: ['statblock.component.css']
})
export class StatblockComponent {

  @Input()
  creep: Creep;

  // cached fields
  skills: string[] = null;
  saves: string[] = null;

  getStatNames(): string[] {
    return statNames;
  }

  getStats(): object[] {
    const statVals = [
      this.creep.strength,
      this.creep.dexterity,
      this.creep.constitution,
      this.creep.intelligence,
      this.creep.wisdom,
      this.creep.charisma
    ];
    const stats = [];
    for (let iStat = 0; iStat < statVals.length; iStat++) {
      stats.push({
        name: statNames[iStat],
        val: statVals[iStat]
      });
    }
    return stats;
  }

  getStatsStr(): string[] {
    const stats = this.getStats();
    return stats.map(
      item => item['val'].toString() + '(' + getStatModLookup(item['val']) + ')');
  }

  private toSignedNum(val: number): string {
    if (val < 0) {
      return val.toString();
    } else {
      return '+' + val.toString();
    }
  }

  getSkills(): string[] {
    if (!this.skills) {
      const skills = [];
      for (const skillName of skillNames) {
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

  getSaves(): string[] {
    if (!this.saves) {
      const saves = [];
      for (const ability of abilities) {
        const throwKey = ability + '_save';
        if (this.creep[throwKey]) {
          saves.push({
            name: Utils.toTitleCase(ability.slice(0, 3)),
            val: this.toSignedNum(this.creep[throwKey])
          });
        }
      }
      this.saves = saves;
    }
    return this.saves;
  }
}
