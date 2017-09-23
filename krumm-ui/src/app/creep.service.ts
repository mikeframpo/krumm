import { Injectable } from "@angular/core";
import { Creep } from "./creep";

import { CREEP } from "./creep-mocked";

@Injectable()
export class CreepService {

  getCreep(id: number): Promise<Creep> {
    return Promise.resolve(CREEP);
  }
}