// To parse this data:
//
//   import { Convert, Welcome } from "./file";
//
//   const welcome = Convert.toWelcome(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface FormattedPokemonData {
  id: number;
  name: string;
  weight: number;
  height: number;
  previous: string | undefined;
  next: string | undefined;
  abilities: string[];
  stats: Stat[];
  DamageRelations: DamageRelation[];
  types: string[];
  sprites: string[];
  description: string;
}

export interface DamageRelation {
  double_damage_from: DoubleDamageFrom[];
  double_damage_to: DoubleDamageFrom[];
  half_damage_from: DoubleDamageFrom[];
  half_damage_to: DoubleDamageFrom[];
  no_damage_from: any[];
  no_damage_to: any[];
}

export interface DoubleDamageFrom {
  name: string;
  url: string;
}

export interface Stat {
  name: string;
  baseStat: number;
}
