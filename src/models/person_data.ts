import { Experience } from "./experience";
import { Person } from "./person";
import { Skill } from "./skill";

export interface PersonData {
  person: Person;
  experiences: Experience[];
  skills: Skill[];
}
