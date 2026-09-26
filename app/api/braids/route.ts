import { NextResponse } from 'next/server';
import { getBraidRecords, saveBraidRecord } from '@/lib/db/mongodb';
import { BraidRecord } from '@/lib/quantum/braidTypes';

export async function GET() {
  try {
    const braids = await getBraidRecords(100);
    return NextResponse.json({ success: true, count: braids.length, data: braids });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch braids';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const record: BraidRecord = {
      id: body.id || `braid-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      createdAt: body.createdAt || new Date().toISOString(),
      recipeId: body.recipeId || 'free-braid',
      dishName: body.dishName || 'Custom Braid Experiment',
      braidWord: body.braidWord || 'e',
      crossings: body.crossings || [],
      stateVector: body.stateVector || [1.0, 0.0],
      probabilities: body.probabilities || { successEnergy: 1.0, decoherenceGlitch: 0.0 },
      blochAngles: body.blochAngles || { theta: 0, phi: 0, x: 0, y: 0, z: 1 },
      flavorProfile: body.flavorProfile || { sweetness: 50, sourness: 50, spiciness: 50, umami: 50, coherence: 100 },
      notes: body.notes || '',
      tags: body.tags || [],
    };

    const saved = await saveBraidRecord(record);
    return NextResponse.json({ success: true, data: saved }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to save braid';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
