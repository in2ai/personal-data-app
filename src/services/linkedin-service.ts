import * as FileSystem from 'expo-file-system';
import { unzip } from 'react-native-zip-archive';
import Papa from 'papaparse';
import { Experience, Skill, UserData } from '../models/userData';
import moment from 'moment';

type LinkedinProfile = {
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

type LinkedinPosition = {
  'Company Name': string;
  Title: string;
  Description: string;
  Location: string;
  'Started On': string;
  'Finished On': string;
};

type LinkedinSkill = {
  Name: string;
};

type LinkedinData = {
  Profile: LinkedinProfile;
  Positions: LinkedinPosition[];
  Skills: LinkedinSkill[];
};
export const getUserFromLinkedInZip = async (fileUri: string): Promise<UserData> => {
  try {
    const test = await unzip(fileUri, FileSystem.documentDirectory);
    const documents = ['Profile', 'Positions', 'Skills'];

    const data: LinkedinData = {} as LinkedinData;
    for (const document of documents) {
      const fileUri = FileSystem.documentDirectory + document + '.csv';

      await FileSystem.readAsStringAsync(fileUri)
        .then((fileContent) => {
          const parsedCsv = Papa.parse(fileContent, {
            header: true,
            skipEmptyLines: true,
          });

          data[document] = parsedCsv.data;
        })
        .catch((error) => {
          console.log('//No data for: ', document);
        });
    }

    // Map data to User model
    const userData: UserData = getUserCVFromLinkedInData(data);

    return userData;
  } catch (error) {
    console.log('Error getting user from LinkedIn zip', error);
  }
};

const getUserCVFromLinkedInData = (data: LinkedinData) => {
  const userData = new UserData();
  userData.firstName = data.Profile[0]['First Name'];
  userData.lastName = data.Profile[0]['Last Name'];
  userData.address = data.Profile[0].Address;
  userData.birthDate = data.Profile[0]['Birth Date'];
  userData.headline = data.Profile[0].Headline;
  userData.summary = data.Profile[0].Summary;
  userData.industry = data.Profile[0].Industry;
  userData.zipCode = data.Profile[0]['Zip Code'];
  userData.geoLocation = data.Profile[0]['Geo Location'];
  userData.twitterHandles = data.Profile[0]['Twitter Handles'];
  userData.websites = data.Profile[0].Websites;
  userData.instantMessengers = data.Profile[0]['Instant Messengers'];

  data.Positions &&
    data.Positions?.forEach((position) => {
      const experience = new Experience();
      experience.companyName = position['Company Name'];
      experience.title = position.Title;
      experience.description = position.Description;
      experience.location = position.Location;
      experience.startedOn = position['Started On'];
      experience.finishedOn = position['Finished On'];

      userData.experiences.push(experience);
    });

  data.Skills &&
    data.Skills?.forEach((skill) => {
      const s = new Skill();
      s.value = skill.Name;
      userData.skills.push(s);
    });

  return userData;
};
