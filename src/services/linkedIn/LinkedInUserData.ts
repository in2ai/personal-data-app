type LinkedinUserDataProfile = {
  'First Name': string;
  'Last Name': string;
  'Maiden Name': string;
  Address: string;
  'Birth Date': string;
  Headline: string;
  Summary: string;
  Industry: string;
  'Zip Code': string;
  'Geo Location': string;
  'Twitter Handles': string;
  Websites: string;
  'Instant Messengers': string;
};

class LinkedinUserDataPosition {
  'Company Name': string;
  Title: string;
  Description: string;
  Location: string;
  'Started On': string;
  'Finished On': string;
}

class LinkedinUserDataSkill {
  Name: string;
}

export class LinkedinUserData {
  Profile: LinkedinUserDataProfile;
  Positions: LinkedinUserDataPosition[];
  Skills: LinkedinUserDataSkill[];
}
