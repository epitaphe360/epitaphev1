import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from "@shared/schema";

// Validate DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required. Please set it in your .env file.');
}

// Initialize PostgreSQL client
const queryClient = postgres(process.env.DATABASE_URL, {
  ssl: 'require',
  connect_timeout: 10000
});

// Initialize Drizzle ORM with proper typing
const db = drizzle(queryClient, { schema });

console.log("✅ Database connection initialized");

export { db, queryClient };
