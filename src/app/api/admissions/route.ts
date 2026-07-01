import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getSession } from '@/lib/auth';

/**
 * POST: Public submission of online registration form.
 */
export async function POST(request: Request) {
  try {
    const {
      student_name,
      father_name,
      mother_name,
      dob,
      class: cls,
      mobile,
      email,
      address,
    } = await request.json();

    // Field Validation
    if (
      !student_name ||
      !father_name ||
      !mother_name ||
      !dob ||
      !cls ||
      !mobile ||
      !address
    ) {
      return NextResponse.json(
        { success: false, error: 'All fields except email are required' },
        { status: 400 }
      );
    }

    // Insert into DB
    const result = await sql(
      `INSERT INTO admissions (student_name, father_name, mother_name, dob, class, mobile, email, address)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        student_name.trim(),
        father_name.trim(),
        mother_name.trim(),
        dob,
        cls,
        mobile.trim(),
        email ? email.trim() : null,
        address.trim(),
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Admission request submitted successfully',
      data: result[0],
    });
  } catch (error: any) {
    console.error('Admissions POST error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE: Admin only removal / archive of an admission request.
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
        { success: false, error: 'Admission ID is required' },
        { status: 400 }
      );
    }

    // 3. Delete from DB
    await sql('DELETE FROM admissions WHERE id = $1', [id]);

    return NextResponse.json({
      success: true,
      message: 'Admission request successfully removed',
    });
  } catch (error: any) {
    console.error('Admissions DELETE error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
