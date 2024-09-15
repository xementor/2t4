import type { Config } from 'drizzle-kit'
// dotenv.config({ path: path.join(__dirname, '..', '..', '.env') })

// console.log(process.env.SUPABASE_DB_URL)

export default {
  schema: './src/db/schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.SUPABASE_DB_URL ?? '',
  },
} satisfies Config
