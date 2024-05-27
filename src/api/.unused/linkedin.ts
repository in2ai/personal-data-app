import * as FileSystem from 'expo-file-system';
import { unzip } from 'react-native-zip-archive';
import Papa from 'papaparse';
import { connectDatabase } from './db';
import { Experience } from '../../models/.unused/experience';
import moment from 'moment';
import { Skill } from '../../models/.unused/skill';
export { linkedinToDatabase };

export type LinkedinProfile = {
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

export type LinkedinPosition = {
  'Company Name': string;
  Title: string;
  Description: string;
  Location: string;
  'Started On': string;
  'Finished On': string;
};

export type LinkedinSkill = {
  Name: string;
};

export type LinkedinData = {
  Profile: LinkedinProfile;
  Positions: LinkedinPosition[];
  Skills: LinkedinSkill[];
};

const linkedinToDatabase = async (uri) => {
  try {
    await unzip(uri, FileSystem.documentDirectory);
    const documents = ['Profile', 'Positions', 'Skills'];

    const data: LinkedinData = {} as LinkedinData;
    for (const document of documents) {
      const fileUri = FileSystem.documentDirectory + document + '.csv';
      const fileContent = await FileSystem.readAsStringAsync(fileUri);
      const parsedCsv = Papa.parse(fileContent, {
        header: true,
        skipEmptyLines: true,
      });

      if (document === 'Profile') data.Profile = parsedCsv.data[0];
      else data[document] = parsedCsv.data;
    }

    const db = await connectDatabase();
    //Person
    let query = {
      sql: 'insert into person (name, surname, about_me, birth_date) values (?, ?, ?, ?)',
      args: [
        data.Profile['First Name'],
        data.Profile['Last Name'],
        data.Profile.Summary,
        data.Profile['Birth Date'],
      ],
    };
    const [result]: any = await db.execAsync([query], false);
    const id_person = result.insertId;

    //Experience
    const experiences: Experience[] = data.Positions.map((position) => {
      return {
        id: null,
        id_person: id_person,
        position_held: position.Title,
        employer: position['Company Name'],
        city: position.Location,
        country: null,
        start_date: position['Started On']
          ? moment(position['Started On'], 'MMM YYYY').toDate()
          : null,
        end_date: position['Finished On']
          ? moment(position['Finished On'], 'MMM YYYY').toDate()
          : null,
        description: position.Description,
      };
    });

    for (const experience of experiences) {
      query = {
        sql: 'insert into experience (id_person, position_held, employer, city, start_date, end_date, description) values (?, ?, ?, ?, ?, ?, ?)',
        args: [
          String(experience.id_person),
          experience.position_held,
          experience.employer,
          experience.city,
          String(experience.start_date),
          String(experience.end_date),
          experience.description,
        ],
      };
      await db.execAsync([query], false);
    }

    //Skill
    const skills: Skill[] = data.Skills.map((skill) => {
      return {
        id: null,
        id_person: id_person,
        value: skill.Name,
        description: null,
      };
    });

    for (const skill of skills) {
      query = {
        sql: 'insert into skill (id_person, value) values (?, ?)',
        args: [String(skill.id_person), skill.value],
      };
      await db.execAsync([query], false);
    }

    return id_person;
  } catch (error) {
    console.error(error);
    return null;
  }
};
