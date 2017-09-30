import { Component, OnInit } from "@angular/core";
import { Creep } from "./creep";
import { CREEP_NEWEDIT } from "./creep-newedit";


@Component({
  selector: 'edit-creep',
  templateUrl: 'edit-creep.component.html',
  styleUrls: ['edit-creep.component.css']
})
export class EditCreepComponent implements OnInit {

  private creep: Creep;

  ngOnInit(): void {
    // TODO: in the future this will check whether the route
    // contains an ID for an existing creep, in which case
    // load it from the DB.
    this.creep = Object.assign({}, CREEP_NEWEDIT);
  }
}