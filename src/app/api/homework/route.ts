import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getSession } from '@/lib/auth';

/**
 * POST: Admin only creation of homework assignment.
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

    const { class: cls, subject, description, due_date } = await request.json();

    // 2. Validate input fields
    if (!cls || !subject || !description || !due_date) {
      return NextResponse.json(
        { success: false, error: 'All fields (class, subject, description, due_date) are required' },
        { status: 400 }
      );
    }

    // 3. Insert into DB
    const result = await sql(
      `INSERT INTO homework (class, subject, description, due_date)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [cls, subject.trim(), description.trim(), due_date]
    );

    return NextResponse.json({
      success: true,
      message: 'Homework posted successfully',
      data: result[0],
    });
  } catch (error: any) {
    console.error('Homework POST error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE: Admin only deletion of homework assignment.
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
        { success: false, error: 'Homework ID is required' },
        { status: 400 }
      );
    }

    // 3. Delete from DB
    await sql('DELETE FROM homework WHERE id = $1', [id]);

    return NextResponse.json({
      success: true,
      message: 'Homework successfully deleted',
    });
  } catch (error: any) {
    console.error('Homework DELETE error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
