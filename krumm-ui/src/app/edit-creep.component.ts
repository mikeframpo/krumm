import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { NgForm } from '@angular/forms';
import { Creep } from './creep';
import { CreepService } from './creep.service';

const SIZES = ['Small', 'Medium', 'Large', 'Gargantuan'];

@Component({
  selector: 'app-edit-creep',
  templateUrl: 'edit-creep.component.html',
  styleUrls: ['edit-creep.component.css']
})
export class EditCreepComponent implements OnInit {

  creep: Creep;
  nameFocused: boolean;

  sizeSearch = this.createTypeahead(this.creepService.getCreatureSizes());
  typeSearch = this.createTypeahead(this.creepService.getCreatureTypes());

  constructor(private creepService: CreepService) { }

  ngOnInit(): void {
    // TODO: in the future this will check whether the route
    // contains an ID for an existing creep, in which case
    // load it from the DB.

    this.creep = Creep.createNewEdit();
  }

  onSubmit(form: NgForm): void {
    console.log(form.value);
  }

  createTypeahead(fetcher: Promise<string[]>):
    (text$: Observable<string>) => Observable<string[]> {

    let fields: string[] = [];
    fetcher.then(result => fields = result);

    return (text$: Observable<string>) =>
      text$.map(term =>
        fields.filter(size => size.toLowerCase().indexOf(term.toLowerCase()) > -1));
  }
}
