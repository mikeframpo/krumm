import { Creep } from "./creep";

export class SearchResponse {
  page: number;
  num_pages: number;
  creeps: Creep[];

  constructor(fromJson: any) {
    this.page = fromJson.page;
    this.num_pages = fromJson.num_pages;
    this.creeps = [];
    for (let i in fromJson.creeps) {
      let creep = Object.assign(new Creep(), fromJson.creeps[i]);
      this.creeps.push(creep);
    }
  }
}