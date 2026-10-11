import { MongoClient, type Db, type ObjectId } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getUri() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable");
  }
  return uri;
}

function createClientPromise() {
  return new MongoClient(getUri()).connect();
}

function getClientPromise() {
  if (process.env.NODE_ENV === "development") {
    global._mongoClientPromise ??= createClientPromise();
    return global._mongoClientPromise;
  }
  return createClientPromise();
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db();
}

export async function getPagesCollection() {
  const db = await getDb();
  const col = db.collection<PageDocument>("pages");
  await col.createIndex({ slug: 1 }, { unique: true });
  return col;
}

export type PageImage = {
  id: string;
  url: string;
  alt: string;
  label: string;
};

export type PageSection = {
  id: string;
  label: string;
  html: string;
};

export type PageDocument = {
  _id?: ObjectId;
  slug: string;
  title: string;
  description: string;
  bodyHtml: string;
  sections?: PageSection[];
  heroImage?: string;
  images: PageImage[];
  published: boolean;
  updatedAt: Date;
  createdAt: Date;
};
