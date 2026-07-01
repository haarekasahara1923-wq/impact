import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getSession } from '@/lib/auth';

/**
 * POST: Admin only creation of an announcement notice.
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

    const { title, content } = await request.json();

    // 2. Validate input fields
    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: 'Both title and content are required' },
        { status: 400 }
      );
    }

    // 3. Insert into DB
    const result = await sql(
      `INSERT INTO notices (title, content)
       VALUES ($1, $2)
       RETURNING *`,
      [title.trim(), content.trim()]
    );

    return NextResponse.json({
      success: true,
      message: 'Notice posted successfully',
      data: result[0],
    });
  } catch (error: any) {
    console.error('Notices POST error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE: Admin only deletion of an announcement notice.
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
        { success: false, error: 'Notice ID is required' },
        { status: 400 }
      );
    }

    // 3. Delete from DB
    await sql('DELETE FROM notices WHERE id = $1', [id]);

    return NextResponse.json({
      success: true,
      message: 'Notice successfully deleted',
    });
  } catch (error: any) {
    console.error('Notices DELETE error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
