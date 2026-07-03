import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { verifyPassword, signToken, setAuthCookie } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 1. Check Admin Credentials first (hardcoded as per user request)
    if (
      normalizedEmail === 'manvendrasingh7283@gmail.com' &&
      password === 'Rajawat123#'
    ) {
      const token = await signToken({
        id: 0,
        email: normalizedEmail,
        name: 'Manvendra Singh',
        role: 'admin',
      });

      await setAuthCookie(token);

      return NextResponse.json({
        success: true,
        role: 'admin',
        message: 'Admin logged in successfully',
      });
    }

    // 2. Otherwise, check Students database
    // Ensure we can query the database
    let studentResult;
    try {
      studentResult = await sql('SELECT * FROM students WHERE LOWER(email) = $1', [normalizedEmail]);
    } catch (dbError: any) {
      console.error('Database query error during login:', dbError);
      return NextResponse.json(
        { success: false, error: 'Database connection failed. Please ensure tables are initialized.' },
        { status: 500 }
      );
    }

    if (!studentResult || studentResult.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const student = studentResult[0];

    // Verify hashed password
    const isPasswordCorrect = verifyPassword(password, student.password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Sign student JWT
    const token = await signToken({
      id: student.id,
      email: student.email,
      name: student.name,
      class: student.class,
      role: 'student',
    });

    await setAuthCookie(token);

    return NextResponse.json({
      success: true,
      role: 'student',
      message: 'Student logged in successfully',
    });
  } catch (error: any) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
