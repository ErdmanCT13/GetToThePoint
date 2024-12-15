
import Database from 'better-sqlite3';
//import * as dotenv from 'dotenv';
// import { drizzle } from 'drizzle-orm/better-sqlite3';
// import { neon } from "@neondatabase/serverless";
import { PGUSER, PGPASSWORD, PGHOST, PGDATABASE } from '$env/static/private';
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { getDatabaseUrl } from './getUrl';

const sql = neon(getDatabaseUrl(PGUSER, PGPASSWORD, PGHOST, PGDATABASE));
export const db = drizzle({ client: sql });