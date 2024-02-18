import { Moment } from 'moment';

export class Experience {
  companyName?: string;
  title?: string;
  description?: string;
  location?: string;
  startedOn?: string;
  finishedOn?: string;
}

export class Skill {
  value?: string;
}
export class UserData {
  firstName?: string;
  lastName?: string;
  address?: string;
  birthDate?: string;
  headline?: string;
  summary?: string;
  industry?: string;
  zipCode?: string;
  geoLocation?: string;
  twitterHandles?: string;
  websites?: string;
  instantMessengers?: string;
  experiences?: Experience[] = [];
  skills?: Skill[] = [];
}
