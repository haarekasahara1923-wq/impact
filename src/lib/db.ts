import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL;

const isPlaceholder =
  !databaseUrl ||
  databaseUrl.includes('[user]') ||
  databaseUrl.includes('[neon-hostname]') ||
  databaseUrl.trim() === '';

if (isPlaceholder) {
  console.warn('Warning: DATABASE_URL is not configured or is a placeholder. Database operations will fail at runtime.');
}

const neonClient = !isPlaceholder ? neon(databaseUrl) : ((async () => {
  throw new Error('DATABASE_URL is not configured correctly. Please update it in .env.local');
}) as any);

export const sql = async (queryText: string, params?: any[]) => {
  if (isPlaceholder) return neonClient();
  return (neonClient as any).query(queryText, params);
};

/**
 * Initialize database tables if they do not exist.
 * This runs when called by an API route or seed script.
 */
export async function initializeDatabase() {
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not configured. Cannot initialize database.');
  }

  console.log('Initializing database tables...');

  // Create admissions table
  await sql(`
    CREATE TABLE IF NOT EXISTS admissions (
      id SERIAL PRIMARY KEY,
      student_name TEXT NOT NULL,
      father_name TEXT NOT NULL,
      mother_name TEXT NOT NULL,
      dob TEXT NOT NULL,
      class TEXT NOT NULL,
      mobile TEXT NOT NULL,
      email TEXT,
      address TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  // Create homework table
  await sql(`
    CREATE TABLE IF NOT EXISTS homework (
      id SERIAL PRIMARY KEY,
      class TEXT NOT NULL,
      subject TEXT NOT NULL,
      description TEXT NOT NULL,
      due_date TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  // Create notices table
  await sql(`
    CREATE TABLE IF NOT EXISTS notices (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  // Create students table
  await sql(`
    CREATE TABLE IF NOT EXISTS students (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      class TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `);

  console.log('Database tables successfully initialized.');
}
