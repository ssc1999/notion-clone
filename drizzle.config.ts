import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

if (!process.env.DATABASE_URL) {
    console.log('Cannot find database url');
}

// DATABASE_URL_NO_SLASH cuz the pass has $'s on it
export default {
    schema: './src/lib/supabase/schema.ts',
    out: './migrations',
    driver: 'pg',
    dbCredentials: {
        connectionString: process.env.DATABASE_URL_NO_SLASH as string|| '',
    },
} satisfies Config;