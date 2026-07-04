import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET() {
  try {
    const galleryItems = await sql('SELECT * FROM gallery_items ORDER BY id DESC');
    return NextResponse.json({ success: true, data: galleryItems });
  } catch (error: any) {
    console.error('Failed to fetch gallery items:', error);
    return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description } = body;

    if (!title || !description) {
      return NextResponse.json({ success: false, error: 'Title and description are required' }, { status: 400 });
    }

    const result = await sql(
      'INSERT INTO gallery_items (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    );

    return NextResponse.json({ success: true, data: result[0] });
  } catch (error: any) {
    console.error('Failed to create gallery item:', error);
    return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    }

    await sql('DELETE FROM gallery_items WHERE id = $1', [id]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Failed to delete gallery item:', error);
    return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
  }
}
