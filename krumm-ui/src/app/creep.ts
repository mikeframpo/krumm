
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
  legendary_actions: Object[];
  reactions: Object[];

  get challengeRating(): string {
    let cr = this.cr_num.toString();
    if (this.cr_den > 1) {
      cr += '/' + this.cr_den.toString();
    }
    return cr;
  }

  static createNewEdit(): Creep {
    const creep = new Creep();
    creep.name = 'Creature';
    creep.size = 'Medium';
    creep.type = 'Humanoid';
    creep.subtype = '';
    creep.alignment = 'Neutral';
    creep.armor_class = 10;
    creep.hit_points = 1;
    creep.hit_dice = null;
    creep.speed = '25';
    creep.strength = 10;
    creep.dexterity = 10;
    creep.constitution = 10;
    creep.intelligence = 10;
    creep.wisdom = 10;
    creep.charisma = 10;
    creep.damage_vulnerabilities = null;
    creep.damage_resistances = null;
    creep.damage_immunities = null;
    creep.condition_immunities = null;
    creep.senses = null;
    creep.languages = null;
    creep.cr_num = null;
    creep.cr_den = null;
    creep.special_abilities = [];
    creep.actions = [];
    creep.legendary_actions = [];
    creep.reactions = [];
    return creep;
  }
}
