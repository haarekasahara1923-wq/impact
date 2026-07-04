import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET() {
  try {
    const toppers = await sql('SELECT * FROM toppers ORDER BY id ASC');
    return NextResponse.json({ success: true, data: toppers });
  } catch (error: any) {
    console.error('Failed to fetch toppers:', error);
    return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, className, score, rankText, award, initials, colorStyle } = body;

    if (!name || !className || !score || !rankText || !award || !initials || !colorStyle) {
      return NextResponse.json({ success: false, error: 'All fields are required' }, { status: 400 });
    }

    const result = await sql(
      'INSERT INTO toppers (name, class, score, rank_text, award, initials, color_style) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, className, score, rankText, award, initials, colorStyle]
    );

    return NextResponse.json({ success: true, data: result[0] });
  } catch (error: any) {
    console.error('Failed to create topper:', error);
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

    await sql('DELETE FROM toppers WHERE id = $1', [id]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Failed to delete topper:', error);
    return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
  }
}
