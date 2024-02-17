import * as FileSystem from 'expo-file-system';
import { unzip } from 'react-native-zip-archive';
import Papa from 'papaparse';
import { Experience, Skill, UserCV } from '../models/userCV';
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
export const getUserFromLinkedInZip = async (fileUri: string): Promise<UserCV> => {
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
    const userCV: UserCV = getUserCVFromLinkedInData(data);

    return userCV;
  } catch (error) {
    console.log('Error getting user from LinkedIn zip', error);
  }
};

const getUserCVFromLinkedInData = (data: LinkedinData) => {
  const userCV = new UserCV();
  userCV.firstName = data.Profile[0]['First Name'];
  userCV.lastName = data.Profile[0]['Last Name'];
  userCV.address = data.Profile[0].Address;
  userCV.birthDate = data.Profile[0]['Birth Date'];
  userCV.headline = data.Profile[0].Headline;
  userCV.summary = data.Profile[0].Summary;
  userCV.industry = data.Profile[0].Industry;
  userCV.zipCode = data.Profile[0]['Zip Code'];
  userCV.geoLocation = data.Profile[0]['Geo Location'];
  userCV.twitterHandles = data.Profile[0]['Twitter Handles'];
  userCV.websites = data.Profile[0].Websites;
  userCV.instantMessengers = data.Profile[0]['Instant Messengers'];

  data.Positions &&
    data.Positions?.forEach((position) => {
      userCV.experiences;
      const experience = new Experience();
      experience.companyName = position['Company Name'];
      experience.title = position.Title;
      experience.description = position.Description;
      experience.location = position.Location;
      experience.startedOn = position['Started On'];
      experience.finishedOn = position['Finished On'];

      userCV.experiences.push(experience);
    });
  console.log('userCV', userCV);

  data.Skills &&
    data.Skills?.forEach((skill) => {
      const s = new Skill();
      s.value = skill.Name;
      userCV.skills.push(s);
    });

  return userCV;
};
