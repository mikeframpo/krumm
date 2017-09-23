import { Component } from "@angular/core";

import { Creep } from './creep';
import { getStatModLookup } from "./stats";

const noEditStyle: string = "creep-field-noedit";
const statNames: string[] = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];

@Component({
  selector: 'stat-block',
  templateUrl: 'statblock.component.html',
  styleUrls: ['statblock.component.css']
})
export class Statblock {

  editable: boolean = false;
  creep: Creep = new Creep();

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
    return this.creep.stats.map(
      item => item.toString() + '(' + getStatModLookup(item) + ')');
  }
}