import * as SQLite from 'expo-sqlite';
import { PersonData } from '../../models/.unused/person_data';

const createTablesIfNotExists = async () => {
  try {
    const db = SQLite.openDatabase('personal-data-app');
    await db.execAsync([{ sql: `pragma foreign_keys = on;`, args: [] }], false);
    await db.execAsync(
      [
        {
          //person
          sql: `create table if not exists person (
            id integer primary key not null,
            name varchar(128),
            surname varchar(256),
            about_me text,
            birth_date date,
            mother_tongue varchar(128)
          )`,
          args: [],
        },
        {
          //nationality
          sql: `create table if not exists nationality (
            id integer primary key not null,
            id_person integer,
            value varchar(128),
            foreign key (id_person) references person(id)
          )`,
          args: [],
        },
        {
          //contact
          sql: `create table if not exists contact (
            id integer primary key not null,
            id_person integer,
            type varchar(128),
            value varchar(128),
            foreign key (id_person) references person(id)
          )`,
          args: [],
        },
        {
          //address
          sql: `create table if not exists address (
            id integer primary key not null,
            id_person integer,
            type varchar(128),
            line1 varchar(512),
            line2 varchar(512),
            postal_code varchar(128),
            city varchar(128),
            country varchar(128),
            foreign key (id_person) references person(id)
          )`,
          args: [],
        },
        {
          //experience
          sql: `create table if not exists experience (
            id integer primary key not null,
            id_person integer,
            position_held varchar(128),
            employer varchar(128),
            city varchar(128),
            country varchar(128),
            start_date date,
            end_date date,
            description text,
            foreign key (id_person) references person(id)
          )`,
          args: [],
        },
        {
          //education
          sql: `create table if not exists education (
            id integer primary key not null,
            id_person integer,
            title varchar(128),
            organisation varchar(128),
            website varchar(128),
            city varchar(128),
            country varchar(128),
            start_date date,
            end_date date,
            description text,
            foreign key (id_person) references person(id)
          )`,
          args: [],
        },
        {
          //language
          sql: `create table if not exists language (
            id integer primary key not null,
            id_person integer,
            language varchar(128),
            listening varchar(128),
            reading varchar(128),
            spoken_interaction varchar(128),
            spoken_production varchar(128),
            writing varchar(128),
            foreign key (id_person) references person(id)
          )`,
          args: [],
        },
        {
          //skill
          sql: `create table if not exists skill (
            id integer primary key not null,
            id_person integer,
            value varchar(128),
            description text,
            foreign key (id_person) references person(id)
          )`,
          args: [],
        },
        {
          //project
          sql: `create table if not exists project (
            id integer primary key not null,
            id_person integer,
            title varchar(128),
            website varchar(128),
            start_date date,
            end_date date,
            description text,
            foreign key (id_person) references person(id)
          )`,
          args: [],
        },
        {
          //license
          sql: `create table if not exists license (
            id integer primary key not null,
            id_person integer,
            title varchar(128),
            start_date date,
            end_date date,
            description text,
            foreign key (id_person) references person(id)
          )`,
          args: [],
        },
        {
          //other
          sql: `create table if not exists other (
            id integer primary key not null,
            id_person integer,
            section_title varchar(128),
            website varchar(128),
            start_date date,
            end_date date,
            description text,
            foreign key (id_person) references person(id)
          )`,
          args: [],
        },
      ],
      false
    );
  } catch (error) {
    console.error(error);
  }
};

const connectDatabase = async () => {
  try {
    const db = SQLite.openDatabase('personal-data-app');
    return db;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getPerson = async (id) => {
  const personData: PersonData = {} as PersonData;
  const db = await connectDatabase();

  //Person
  let query = {
    sql: 'select * from person where id = ?',
    args: [id],
  };
  let [result]: any = await db.execAsync([query], false);
  personData.person = result.rows[0];

  //Experiences
  query = {
    sql: 'select * from experience where id_person = ?',
    args: [id],
  };
  [result] = await db.execAsync([query], false);
  personData.experiences = result.rows;

  //Skills
  query = {
    sql: 'select * from skill where id_person = ?',
    args: [id],
  };
  [result] = await db.execAsync([query], false);
  personData.skills = result.rows;
  return personData;
};

export { createTablesIfNotExists, connectDatabase };
