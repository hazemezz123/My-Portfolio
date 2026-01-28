import { MongoClient, ObjectId } from "mongodb";

// Type definitions
export interface Project {
  _id?: ObjectId;
  id?: number;
  title: string;
  description: string;
  tags: string[];
  demoUrl?: string;
  codeUrl: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SiteConfig {
  _id?: ObjectId;
  key: string;
  value: string;
  updatedAt: Date;
}

export interface GuestbookEntry {
  _id?: ObjectId;
  id?: number;
  name: string;
  email: string;
  message: string;
  location?: string;
  created_at?: string;
  createdAt?: Date;
  date?: string;
}

// MongoDB connection string
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://farok_db_user:Tg13wlD8cnPH84t6@budgetlydb.fenwce0.mongodb.net/expense-tracker?retryWrites=true&w=majority&appName=budgetlyDB";
const DB_NAME = "portfolio";

// Global variable to cache the MongoDB client
let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

// Create a cached connection to MongoDB
async function getClient(): Promise<MongoClient> {
  if (client) {
    return client;
  }

  if (!clientPromise) {
    client = new MongoClient(MONGODB_URI);
    clientPromise = client.connect();
  }

  client = await clientPromise;
  return client;
}

// Get the database instance
export async function getDatabase() {
  const client = await getClient();
  return client.db(DB_NAME);
}

// Get the projects collection
export async function getProjectsCollection() {
  const db = await getDatabase();
  return db.collection<Project>("projects");
}

// Get the guestbook collection
export async function getGuestbookCollection() {
  const db = await getDatabase();
  return db.collection<GuestbookEntry>("guestbook");
}

// Get the site config collection
export async function getSiteConfigCollection() {
  const db = await getDatabase();
  return db.collection<SiteConfig>("site_config");
}

// Export ObjectId for use in other files
export { ObjectId };
