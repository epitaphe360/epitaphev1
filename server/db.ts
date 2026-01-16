import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from "@shared/schema";

let queryClient: any;
let db: any;

try {
  if (!process.env.DATABASE_URL) {
    console.warn("⚠️ DATABASE_URL not set, running in mock mode");
  } else {
    queryClient = postgres(process.env.DATABASE_URL, { 
      ssl: 'require', 
      connect_timeout: 10000 
    });
    db = drizzle(queryClient, { schema });
    console.log("✅ Database connection initialized");
  }
} catch (error: any) {
  console.error("❌ Database connection error:", error.message);
  console.error("Continuing without database...");
}

export { db, queryClient };
