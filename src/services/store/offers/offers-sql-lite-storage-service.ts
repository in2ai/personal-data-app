import * as SQLite from 'expo-sqlite';

import { WorkOffer } from '../../../models/workOffer';

export const createDatabaseTableIfNotExist = async () => {
  const db = SQLite.openDatabase('work-offers-database.db');
  try {
    await db
      .execAsync(
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
            created_at INTEGER,
            match INTEGER,
            industry VARCHAR(128)
          )`,
            args: [],
          },
        ],
        false
      )
      .then((result) => {
        console.log('Table created', result);
      })
      .catch((error) => {
        console.error('Error creating table', error);
      });
  } catch (error) {
    console.error(error);
  }
};

const connectDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
  try {
    const db = SQLite.openDatabase('work-offers-database.db');
    return db;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getAllOffers = async (): Promise<WorkOffer[]> => {
  const db = await connectDatabase();
  let query = {
    sql: 'select * from workoffer',
    args: [],
  };
  const [result]: any = await db
    .execAsync([query], false)
    .then((result) => {
      console.log('Offers from storage', result);
      return result;
    })
    .catch((error) => {
      console.error('Error getting offers from storage', error);
    });
  const workOffers: WorkOffer[] = result.rows.map((row) => {
    return {
      title: row.title,
      summary: row.summary,
      requiredSkills: row.required_skills ? row.required_skills.split(',') : [],
      location: row.location,
      price: row.price,
      currency: row.currency,
      period: row.period,
      nostrId: row.nostr_id,
      createdAt: row.created_at,
      match: row.match,
      industry: row.industry,
    };
  });

  return workOffers;
};

const getAllIndustryOffers = async (industry: string): Promise<WorkOffer[]> => {
  const db = await connectDatabase();
  let query = {
    sql: 'select * from workoffer WHERE industry = ?',
    args: [industry],
  };
  const [result]: any = await db
    .execAsync([query], false)
    .then((result) => {
      console.log(`Offers from storage from industry "${industry}": `, result);
      return result;
    })
    .catch((error) => {
      console.error('Error getting offers from industry', error);
    });
  const workOffers: WorkOffer[] = result.rows.map((row) => {
    return {
      title: row.title,
      summary: row.summary,
      requiredSkills: row.required_skills ? row.required_skills.split(',') : [],
      location: row.location,
      price: row.price,
      currency: row.currency,
      period: row.period,
      nostrId: row.nostr_id,
      createdAt: row.created_at,
      match: row.match,
      industry: row.industry,
    };
  });

  return workOffers;
};

const removeAllOffers = async (): Promise<void> => {
  const db = await connectDatabase();
  try {
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
  const db = await connectDatabase();
  try {
    let query = {
      sql: `INSERT INTO workoffer (title, summary, required_skills, location, price, currency, period, nostr_id, created_at, match, industry) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        newOffer.title,
        newOffer.summary,
        newOffer.requiredSkills ? newOffer.requiredSkills.join(',') : '',
        newOffer.location,
        newOffer.price,
        newOffer.currency,
        newOffer.period,
        newOffer.nostrId,
        newOffer.createdAt,
        newOffer.match,
        newOffer.industry,
      ],
    };
    await db
      .execAsync([query], false)
      .then((result) => {
        console.log('Offer added', result);
      })
      .catch((err) => {
        console.error('Error adding new offer', err);
      });
  } catch (err) {
    throw new Error(`ERROR adding new offer => ${err}`);
  }
};

const updateOfferMatch = async (workOffer: WorkOffer): Promise<void> => {
  const db = await connectDatabase();
  try {
    let query = {
      sql: `UPDATE workoffer SET match = ? WHERE nostr_id = ?`,
      args: [workOffer.match, workOffer.nostrId],
    };
    await db
      .execAsync([query], false)
      .then((result) => {
        console.log('Offer updated', result);
      })
      .catch((err) => {
        console.error('Error updating offer', err);
      });
  } catch (err) {
    throw new Error(`ERROR updating offer => ${err}`);
  }
};

const resetOfferMatch = async (workOffer: WorkOffer): Promise<void> => {
  const db = await connectDatabase();
  try {
    let query = {
      sql: `UPDATE workoffer SET match = ? WHERE nostr_id = ?`,
      args: [null, workOffer.nostrId],
    };
    await db
      .execAsync([query], false)
      .then((result) => {
        console.log('Offer resetted match', result);
      })
      .catch((err) => {
        console.error('Error resetting offer match', err);
      });
  } catch (err) {
    throw new Error(`ERROR resetting offer match => ${err}`);
  }
};

const offersSqlLiteStorageService = {
  getAllOffers,
  removeAllOffers,
  addNewOffer,
  updateOfferMatch,
  resetOfferMatch,
  getAllIndustryOffers,
};

export default offersSqlLiteStorageService;
