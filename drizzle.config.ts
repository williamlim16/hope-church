
import { env } from '@/env';
import { defineConfig } from 'drizzle-kit';


export default defineConfig({
        schema: './src/db/schema',
        out: './supabase/migrations',
        dialect: 'postgresql',
        dbCredentials: {
                url: env.DATABASE_URL,
        },
});
