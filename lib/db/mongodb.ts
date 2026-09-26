import { MongoClient, Db } from 'mongodb';
import { BraidRecord } from '../quantum/braidTypes';

const MONGODB_URI = process.env.MONGODB_URI || '';
const DB_NAME = process.env.MONGODB_DB_NAME || 'quantum_kitchen';

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

// Fallback in-memory store for instant zero-config experience
const memoryBraidStore: BraidRecord[] = [
  {
    id: 'braid-init-01',
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    recipeId: 'recipe-souffle',
    dishName: 'Cosmic Soufflé',
    braidWord: 'σ₁ · σ₂⁻¹ · σ₁',
    crossings: [
      { id: 'c1', lane: 1, isOver: true, strandA: 0, strandB: 1, depth: 0, timestamp: Date.now() - 2100000 },
      { id: 'c2', lane: 2, isOver: false, strandA: 1, strandB: 2, depth: 1, timestamp: Date.now() - 2000000 },
      { id: 'c3', lane: 1, isOver: true, strandA: 0, strandB: 1, depth: 2, timestamp: Date.now() - 1900000 },
    ],
    stateVector: [0.894, 0.447],
    probabilities: {
      successEnergy: 0.80,
      decoherenceGlitch: 0.20,
    },
    blochAngles: { theta: 0.927, phi: 0.0, x: 0.8, y: 0.0, z: 0.6 },
    flavorProfile: { sweetness: 84, sourness: 32, spiciness: 45, umami: 78, coherence: 80 },
    notes: 'Reference Fibonacci knot. Stable phase rotation verified with R-matrix.',
    tags: ['Gold Standard', 'High Fidelity', 'Soufflé'],
  },
  {
    id: 'braid-init-02',
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    recipeId: 'recipe-tiramisu',
    dishName: 'Tachyon Tiramisu',
    braidWord: 'σ₂ · σ₁ · σ₂⁻¹ · σ₁',
    crossings: [
      { id: 'c1', lane: 2, isOver: true, strandA: 1, strandB: 2, depth: 0, timestamp: Date.now() - 900000 },
      { id: 'c2', lane: 1, isOver: true, strandA: 0, strandB: 1, depth: 1, timestamp: Date.now() - 850000 },
      { id: 'c3', lane: 2, isOver: false, strandA: 1, strandB: 2, depth: 2, timestamp: Date.now() - 800000 },
      { id: 'c4', lane: 1, isOver: true, strandA: 0, strandB: 1, depth: 3, timestamp: Date.now() - 750000 },
    ],
    stateVector: [0.732, 0.681],
    probabilities: {
      successEnergy: 0.536,
      decoherenceGlitch: 0.464,
    },
    blochAngles: { theta: 1.498, phi: 1.05, x: 0.5, y: 0.86, z: 0.07 },
    flavorProfile: { sweetness: 65, sourness: 82, spiciness: 30, umami: 91, coherence: 54 },
    notes: 'Non-Abelian commutation proof: σ₂σ₁ ≠ σ₁σ₂ creates rich Umami profile.',
    tags: ['Non-Abelian', 'Superposition', 'Tiramisu'],
  },
];

export async function getDb(): Promise<Db | null> {
  if (!MONGODB_URI) {
    return null;
  }

  try {
    if (!clientPromise) {
      client = new MongoClient(MONGODB_URI);
      clientPromise = client.connect();
    }
    const connectedClient = await clientPromise;
    return connectedClient.db(DB_NAME);
  } catch (err) {
    console.warn('MongoDB connection failed, falling back to memory store:', err);
    return null;
  }
}

export async function saveBraidRecord(record: BraidRecord): Promise<BraidRecord> {
  const db = await getDb();
  if (db) {
    try {
      const collection = db.collection<BraidRecord>('braids');
      await collection.insertOne({ ...record });
      return record;
    } catch (err) {
      console.warn('MongoDB insert failed, storing in memory:', err);
    }
  }

  // Prepend to in-memory store
  const existingIndex = memoryBraidStore.findIndex(b => b.id === record.id);
  if (existingIndex >= 0) {
    memoryBraidStore[existingIndex] = record;
  } else {
    memoryBraidStore.unshift(record);
  }
  return record;
}

export async function getBraidRecords(limit: number = 50): Promise<BraidRecord[]> {
  const db = await getDb();
  if (db) {
    try {
      const collection = db.collection<BraidRecord>('braids');
      const docs = await collection.find({}).sort({ createdAt: -1 }).limit(limit).toArray();
      if (docs.length > 0) {
        return docs.map((d) => ({
          ...d,
          id: d.id || (d as { _id?: { toString(): string } })._id?.toString() || 'braid-doc',
        }));
      }
    } catch (err) {
      console.warn('MongoDB query failed, serving from memory:', err);
    }
  }

  return [...memoryBraidStore].slice(0, limit);
}

export async function getBraidRecordById(id: string): Promise<BraidRecord | null> {
  const db = await getDb();
  if (db) {
    try {
      const collection = db.collection<BraidRecord>('braids');
      const doc = await collection.findOne({ id });
      if (doc) return doc;
    } catch (err) {
      console.warn('MongoDB query by id failed, searching memory:', err);
    }
  }

  return memoryBraidStore.find(b => b.id === id) || null;
}
