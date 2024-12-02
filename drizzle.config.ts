import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  out: './src/lib/database',
  schema: './src/lib/database/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    // password: "DvL6n2Jt7DvBjgVM",
    // user: "postgres.hbyhuxppgfoqfehxdxpl",
    // host: "aws-0-us-east-1.pooler.supabase.com",
    // database: "postgres"
    //url: "postgresql://postgres.hbyhuxppgfoqfehxdxpl:[DvL6n2Jt7DvBjgVM]@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
    url: "./src/lib/database/sqlite.db"
  },
});