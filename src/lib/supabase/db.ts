import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import * as schema from '../../../migrations/schema';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { max } from 'drizzle-orm';
dotenv.config({ path: '.env' });

if (!process.env.DATABASE_URL) {
    console.log('No database URL');
}

const client = postgres(process.env.DATABASE_URL as string, {max:1});
const db = drizzle(client, { schema });
const migrateDb = async () => {
    try {
        console.log('🟠 Migrating client');
        await migrate(db, { migrationsFolder: "migrations" });
        console.log('🟢 Migration successfull');
    } catch (error) {
        console.log(error)
        console.log('🔴 Error migrating the client');
    }
}

migrateDb();
export default db;