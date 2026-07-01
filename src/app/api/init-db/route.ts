import { NextResponse } from 'next/server';
import { sql, initializeDatabase } from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export async function GET() {
  try {
    // 1. Initialize tables if they do not exist
    await initializeDatabase();

    // 2. Seed a default student for test/demo purposes if no students exist
    const students = await sql('SELECT * FROM students LIMIT 1');
    if (students.length === 0) {
      console.log('Seeding default student account...');
      const hashedPassword = hashPassword('student@password');
      await sql(
        'INSERT INTO students (name, class, email, password) VALUES ($1, $2, $3, $4)',
        ['Rahul Sharma', '10th', 'student@impact.com', hashedPassword]
      );
      console.log('Default student seeded.');
    }

    return NextResponse.json({
      success: true,
      message: 'Database initialized and seeded successfully.',
      testCredentials: {
        student: {
          email: 'student@impact.com',
          password: 'student@password',
        },
        admin: {
          email: 'manvendrasingh7283@gmail.com',
          password: 'impact@admin2024',
        },
      },
    });
  } catch (error: any) {
    console.error('Database initialization failed:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Database initialization failed' },
      { status: 500 }
    );
  }
}
