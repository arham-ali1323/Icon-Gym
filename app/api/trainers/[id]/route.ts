import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const filePath = path.join(process.cwd(), 'data', 'trainers.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const trainers = JSON.parse(fileContents);

    const trainer = trainers.find((t: any) => t.id === parseInt(id));

    if (!trainer) {
      return NextResponse.json({ error: 'Trainer not found' }, { status: 404 });
    }

    return NextResponse.json(trainer);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch trainer' }, { status: 500 });
  }
}
