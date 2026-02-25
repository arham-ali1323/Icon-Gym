import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'trainers.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const trainers = JSON.parse(fileContents);
    return NextResponse.json(trainers);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch trainers' }, { status: 500 });
  }
}
