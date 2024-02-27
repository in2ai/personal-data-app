import * as SQLite from 'expo-sqlite';

import { WorkOffer } from '../../../models/WorkOffer';

const createDatabaseIfNotExist = async () => {
  try {
    const db = SQLite.openDatabase('work-offers-database');
    await db.execAsync(
      [
        {
          //person
          sql: `CREATE TABLE IF NOT EXISTS workoffer (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title VARCHAR(128),
            summary TEXT,
            required_skills VARCHAR(256),
            location TEXT,
            price INTEGER,
            currency VARCHAR(128),
            period VARCHAR(128),
            nostr_id VARCHAR(128),
            created_at INTEGER
            match INTEGER
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

const connectDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
  try {
    const db = SQLite.openDatabase('work-offers-database');
    return db;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getAllOffers = async (): Promise<WorkOffer[]> => {
  await createDatabaseIfNotExist();
  const db = await connectDatabase();
  let query = {
    sql: 'select * from workoffer',
    args: [],
  };
  const [result]: any = await db.execAsync([query], false);
  const workOffers: WorkOffer[] = result.rows.map((row) => {
    return {
      title: row[1],
      summary: row[2],
      requiredSkills: row[3].split(','),
      location: row[4],
      price: row[5],
      currency: row[6],
      period: row[7],
      nostrId: row[8],
      createdAt: row[9],
      match: row[10],
    };
  });

  console.log('Offers from storage', workOffers);

  return workOffers;
};

const removeAllOffers = async (): Promise<void> => {
  try {
    await createDatabaseIfNotExist();
    const db = await connectDatabase();
    let query = {
      sql: 'DELETE FROM workoffer',
      args: [],
    };

    await db.execAsync([query], false);
  } catch (err) {
    throw new Error(`ERROR removing stored offers => ${err}`);
  }
};

const addNewOffer = async (newOffer: WorkOffer): Promise<void> => {
  try {
    await createDatabaseIfNotExist();
    const db = await connectDatabase();
    let query = {
      sql: `INSERT INTO workoffer (title, summary, required_skills, location, price, currency, period, nostr_id, created_at, match) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        newOffer.title,
        newOffer.summary,
        newOffer.requiredSkills.join(','),
        newOffer.location,
        newOffer.price,
        newOffer.currency,
        newOffer.period,
        newOffer.nostrId,
        newOffer.createdAt,
        newOffer.match,
      ],
    };
    await db.execAsync([query], false);
  } catch (err) {
    throw new Error(`ERROR adding new offer => ${err}`);
  }
};

const offersSqlLiteStorageService = {
  getAllOffers,
  removeAllOffers,
  addNewOffer,
};

export default offersSqlLiteStorageService;
