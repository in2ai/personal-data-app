import * as SQLite from "expo-sqlite";

const connectDatabase = async () => {
  try {
    const db = SQLite.openDatabase("personal-data-app");
    //await db.execAsync([{ sql: `pragma foreign_keys = on;`, args: [] }], false);
    await db.execAsync(
      [
        {
          sql: `create table if not exists linkedin (id integer primary key not null, address text, birth_date text, first_name text, geo_location text, headline text, industry text, instant_messengers text, last_name text, maiden_name text, summary text, twitter_handles text, websites text, zip_code text);`,
          args: [],
        },
        {
          sql: `create table if not exists europass (id integer primary key not null, address text, birth_date text, first_name text, geo_location text, headline text, industry text, instant_messengers text, last_name text, maiden_name text, summary text, twitter_handles text, websites text, zip_code text);`,
          args: [],
        },
      ],
      false
    );
    return db;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { connectDatabase };
