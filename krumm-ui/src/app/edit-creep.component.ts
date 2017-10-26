import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { NgForm } from '@angular/forms';
import { Creep } from './creep';

const SIZES = ['Small', 'Medium', 'Large', 'Gargantuan'];

@Component({
  selector: 'app-edit-creep',
  templateUrl: 'edit-creep.component.html',
  styleUrls: ['edit-creep.component.css']
})
export class EditCreepComponent implements OnInit {

  creep: Creep;
  nameFocused: boolean;

  ngOnInit(): void {
    // TODO: in the future this will check whether the route
    // contains an ID for an existing creep, in which case
    // load it from the DB.

    this.creep = Creep.createNewEdit();
  }

  onSubmit(form: NgForm): void {
    console.log(form.value);
  }

  sizeSearch = (text$: Observable<string>) =>
    text$
      .map(term => SIZES.filter(
        size => size.toLowerCase().indexOf(term.toLowerCase()) > -1))

}
