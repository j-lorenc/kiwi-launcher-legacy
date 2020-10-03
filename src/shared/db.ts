import path from 'path';
import sqlite3 from '@journeyapps/sqlcipher';

import { generateEncryptionKey } from '../workers/services/keytar/keytar';

const sqlcipher = sqlite3.verbose();

const open = () => {
  const dbPath = path.resolve('./public/cipher.sqlite3');

  const database = new sqlcipher.Database(
    dbPath,
    sqlcipher.OPEN_READWRITE | sqlcipher.OPEN_CREATE,
    (err) => {
      if (err) console.error('Database opening error: ', err);
    }
  );

  return database;
};

export const seed = async (): Promise<void> => {
  const database = open();

  const encKey = await generateEncryptionKey();

  database.serialize(() => {
    database.run(`PRAGMA key = '${encKey}'`);

    database.run(
      `CREATE TABLE IF NOT EXISTS "launchers" (
            "launcher_id"	TEXT NOT NULL UNIQUE,
            "name"	TEXT,
            PRIMARY KEY("launcher_id")
        );`
    );
  });

  database.run(
    `CREATE TABLE IF NOT EXISTS "auth" (
        "auth_id"	TEXT NOT NULL UNIQUE,
        "launcher_id"	TEXT NOT NULL UNIQUE,
        "user_id"	TEXT,
        "api_token"	TEXT,
        "refresh_token"	TEXT,
        PRIMARY KEY("auth_id"),
        FOREIGN KEY("launcher_id") REFERENCES "launcher"("launcher_id")
    );`
  );

  database.run(
    `CREATE TABLE IF NOT EXISTS "games" (
        "game_id"	TEXT NOT NULL UNIQUE,
        "name"	TEXT,
        "launcher_id"	TEXT,
        "original_id"	TEXT,
        "icon_url"	TEXT,
        "background_url"	TEXT,
        "cover_url"	TEXT,
        PRIMARY KEY("game_id"),
        FOREIGN KEY("launcher_id") REFERENCES "launchers"("launcher_id")
    );`
  );

  database.close();
};

export const query = async <T>(cb: (database: any) => Promise<T> | T): Promise<T> => {
  const database = open();
  const encKey = await generateEncryptionKey();
  const returnObj = new Promise<T>((resolve) => {
    database.serialize(async () => {
      database.run(`PRAGMA key = '${encKey}'`);
      resolve(cb(database));
    });
  });

  database.close();

  return returnObj;
};
