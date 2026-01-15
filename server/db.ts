import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set. Did you forget to provision a database?");
}

export const queryClient = postgres(process.env.DATABASE_URL, { 
  ssl: 'require', 
  connect_timeout: 10000 
});
export const db = drizzle(queryClient, { schema });
