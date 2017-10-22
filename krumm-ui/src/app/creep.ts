
export class Creep {
  name: string;
  size: string;
  type: string;
  subtype: string;
  alignment: string;
  armor_class: number;
  hit_points: number;
  hit_dice: string;
  speed: string;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  damage_vulnerabilities: string;
  damage_resistances: string;
  damage_immunities: string;
  condition_immunities: string;
  senses: string;
  languages: string;
  cr_num: number;
  cr_den: number;
  special_abilities: Object[];
  actions: Object[];

  get challengeRating(): string {
    let cr = this.cr_num.toString();
    if (this.cr_den > 1) {
      cr += '/' + this.cr_den.toString();
    }
    return cr;
  }
}
