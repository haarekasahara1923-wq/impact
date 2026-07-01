import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getSession, hashPassword } from '@/lib/auth';

/**
 * POST: Admin only student account creation.
 */
export async function POST(request: Request) {
  try {
    // 1. Authenticate Admin
    const session = await getSession();
    if (!session || session.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized access' },
        { status: 401 }
      );
    }

    const { name, class: cls, email, password } = await request.json();

    // 2. Validate input fields
    if (!name || !cls || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'All fields (name, class, email, password) are required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 3. Check if email already exists
    const existingStudent = await sql(
      'SELECT id FROM students WHERE LOWER(email) = $1',
      [normalizedEmail]
    );

    if (existingStudent.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Student with this email username already exists' },
        { status: 400 }
      );
    }

    // 4. Hash the password and save
    const hashedPassword = hashPassword(password);
    const result = await sql(
      `INSERT INTO students (name, class, email, password)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, class, email`,
      [name.trim(), cls, normalizedEmail, hashedPassword]
    );

    return NextResponse.json({
      success: true,
      message: 'Student account created successfully',
      data: result[0],
    });
  } catch (error: any) {
    console.error('Students POST error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE: Admin only student account deletion.
 */
export async function DELETE(request: Request) {
  try {
    // 1. Authenticate Admin
    const session = await getSession();
    if (!session || session.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized access' },
        { status: 401 }
      );
    }

    // 2. Parse query parameters
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Student ID is required' },
        { status: 400 }
      );
    }

    // 3. Delete from DB
    await sql('DELETE FROM students WHERE id = $1', [id]);

    return NextResponse.json({
      success: true,
      message: 'Student account successfully deleted',
    });
  } catch (error: any) {
    console.error('Students DELETE error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
