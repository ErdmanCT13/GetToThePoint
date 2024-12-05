
import Database from 'better-sqlite3';
//import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/better-sqlite3';

//dotenv.config();

//const client = new Database(process.env.DB_PATH);
//const client = new Database("src/lib/database/sqlite.db");
//const client = new Database("src/lib/database/");
const client = new Database("static/sqlite.db")

const db = drizzle(client);

export { db };