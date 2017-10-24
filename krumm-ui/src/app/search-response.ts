import { Creep } from "./creep";

export class SearchResponse {
  num_creeps: number;
  num_creeps_per_page: number;
  creeps: Creep[];

  constructor(fromJson: any) {
    this.num_creeps = fromJson.num_creeps;
    this.num_creeps_per_page = fromJson.num_creeps_per_page;
    this.creeps = [];
    for (let i in fromJson.creeps) {
      let creep = Object.assign(new Creep(), fromJson.creeps[i]);
      this.creeps.push(creep);
    }
  }
}