import { Creep } from "./creep";

export class SearchResponse {
  page: number;
  num_pages: number;
  creeps: Creep[];
}