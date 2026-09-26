import { NextResponse } from 'next/server';
import { getBraidRecords } from '@/lib/db/mongodb';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const format = searchParams.get('format') || 'json';
    const braids = await getBraidRecords(500);

    if (format === 'csv') {
      const headers = [
        'ID',
        'Timestamp',
        'Dish_Name',
        'Braid_Word',
        'Crossing_Count',
        'State_0_Alpha',
        'State_1_Beta',
        'Success_Energy_Pct',
        'Decoherence_Glitch_Pct',
        'Sweetness',
        'Sourness',
        'Spiciness',
        'Umami',
        'Coherence',
        'Bloch_Theta',
        'Bloch_Phi',
        'Notes',
      ];

      const rows = braids.map((b) => [
        `"${b.id}"`,
        `"${b.createdAt}"`,
        `"${b.dishName}"`,
        `"${b.braidWord.replace(/"/g, '""')}"`,
        b.crossings.length,
        b.stateVector[0].toFixed(4),
        b.stateVector[1].toFixed(4),
        (b.probabilities.successEnergy * 100).toFixed(1),
        (b.probabilities.decoherenceGlitch * 100).toFixed(1),
        b.flavorProfile.sweetness,
        b.flavorProfile.sourness,
        b.flavorProfile.spiciness,
        b.flavorProfile.umami,
        b.flavorProfile.coherence,
        b.blochAngles.theta.toFixed(3),
        b.blochAngles.phi.toFixed(3),
        `"${(b.notes || '').replace(/"/g, '""')}"`,
      ]);

      const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="quantum_braids_dataset.csv"',
        },
      });
    }

    // Default JSON
    return new NextResponse(JSON.stringify(braids, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename="quantum_braids_telemetry.json"',
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error during export';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
