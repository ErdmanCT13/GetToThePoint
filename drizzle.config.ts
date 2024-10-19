import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  out: './db/drizzle',
  schema: './db/schema/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    password: "DvL6n2Jt7DvBjgVM",
    user: "postgres.hbyhuxppgfoqfehxdxpl",
    host: "aws-0-us-east-1.pooler.supabase.com",
    database: "postgres"
    //url: "postgresql://postgres.hbyhuxppgfoqfehxdxpl:[DvL6n2Jt7DvBjgVM]@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
  },
});