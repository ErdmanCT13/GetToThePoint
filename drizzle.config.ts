import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { getDatabaseUrl } from "./src/lib/database/getUrl"

const user = process.env.PGUSER!
const password =  process.env.PGPASSWORD!
const host = process.env.PGHOST!
const database = process.env.PGDATABASE!

export default defineConfig({
  out: './src/lib/database',
  schema: './src/lib/database/schema.ts',
  dialect: "postgresql",
  dbCredentials: {
    //url: process.env.DB_URL!
    url: getDatabaseUrl(user, password, host, database)
    //url: "postgresql://GetToThePoint_owner:WkYr35JntySN@ep-bold-art-a8pgk5ft-pooler.eastus2.azure.neon.tech/GetToThePoint?sslmode=require"
    
    //url: "./src/lib/database/sqlite.db"
    //url: "/sqlite.db"
  },
});

//DB_URL = "postgresql://GetToThePoint_owner:WkYr35JntySN@ep-bold-art-a8pgk5ft.eastus2.azure.neon.tech/GetToThePoint?sslmode=require"
