import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const DB_PATH = process.env.DB_PATH || './data/modpack-codex.db';
mkdirSync(dirname(DB_PATH), { recursive: true });

export const db = new DatabaseSync(DB_PATH);

db.exec(`
  CREATE TABLE IF NOT EXISTS notes (
    mod_id TEXT PRIMARY KEY,
    text TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS progress (
    mod_id TEXT NOT NULL,
    step_index INTEGER NOT NULL,
    done INTEGER NOT NULL,
    PRIMARY KEY (mod_id, step_index)
  );
`);
