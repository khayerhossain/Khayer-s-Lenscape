import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

// Global cache to prevent multiple connections in Next.js hot reload
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// ─── 1. Connection Function ────────────────────────────────────────────────
export async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, { bufferCommands: false })
      .then((mongooseInstance) => {
        console.log("✅ Connected to MongoDB successfully!");
        return mongooseInstance;
      })
      .catch((err) => {
        cached.promise = null;
        console.error("❌ MongoDB connection failed:", err.message);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// ─── 2. Schema Definitions ─────────────────────────────────────────────────

const PortfolioSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    date: { type: String, default: "" },
    img: { type: String, required: true },
    category: { type: String, default: "" },
  },
  { collection: "Portfolios", timestamps: true }
);

const MomentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    date: { type: String, default: "" },
    location: { type: String, default: "" },
    img: { type: String, required: true },
    span: { type: String, default: "md:col-span-1 md:row-span-1" },
    category: { type: String, default: "" },
  },
  { collection: "Photos", timestamps: true }
);

const ExploreSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, default: "" },
    src: { type: String, required: true },
  },
  { collection: "Explores", timestamps: true }
);

const VideoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    thumbnail: { type: String, required: true },
    videoId: { type: String, required: true },
    type: { type: String, enum: ["youtube", "facebook"], required: true },
  },
  { collection: "Videos", timestamps: true }
);

// ─── 3. Safe Model Exports (Next.js hot-reload safe) ───────────────────────
// Always delete cached model before re-registering to avoid "Cannot overwrite model" errors

function getModel(name, schema) {
  // If model already registered in this process, return it
  if (mongoose.models[name]) {
    return mongoose.models[name];
  }
  return mongoose.model(name, schema);
}

export const PortfolioItem = getModel("PortfolioItem", PortfolioSchema);
export const MomentItem = getModel("MomentItem", MomentSchema);
export const ExploreItem = getModel("ExploreItem", ExploreSchema);
export const VideoItem = getModel("VideoItem", VideoSchema);

// ─── 4. Seeder Data & Function ─────────────────────────────────────────────

const exploreSeed = [
  {
    title: "GUAVA MARKET",
    location: "Brahmanbaria, Bangladesh",
    src: "https://i.ibb.co.com/2Yq6srY8/IMG20240408171721.jpg",
  },
  {
    title: "MORNING ROUTINE",
    location: "Brahmanbaria, Bangladesh",
    src: "https://i.ibb.co.com/7NRPpcYz/IMG20240408164947-1.jpg",
  },
  {
    title: "RAINFOREST PATH",
    location: "Brahmanbaria, Bangladesh",
    src: "https://i.ibb.co.com/1GdBTpTD/IMG20240223191338.jpg",
  },
  {
    title: "RED UMBRELLA",
    location: "Brahmanbaria, Bangladesh",
    src: "https://i.ibb.co.com/xS8rSsGf/IMG-1621.jpg",
  },
  {
    title: "MOUNTAIN SUNSET",
    location: "Brahmanbaria, Bangladesh",
    src: "https://i.ibb.co.com/v6v5Hk1Z/IMG-20240429-204848-107.jpg",
  },
  {
    title: "CYBERPUNK VIBES",
    location: "Brahmanbaria, Bangladesh",
    src: "https://i.ibb.co.com/BV8KYKbX/IMG-7464.jpg",
  },
  {
    title: "RIVER CROSSING",
    location: "Brahmanbaria, Bangladesh",
    src: "https://i.ibb.co.com/6538rkZ/IMG-7463.jpg",
  },
  {
    title: "STREET MUSICIAN",
    location: "Brahmanbaria, Bangladesh",
    src: "https://i.ibb.co.com/svhpxJWq/IMG-7460.jpg",
  },
  {
    title: "WATERFALL RUSH",
    location: "Brahmanbaria, Bangladesh",
    src: "https://i.ibb.co.com/QjQKNKt0/IMG-7447.jpg",
  },
];

const videosSeed = [
  {
    title: "The Silent Flow",
    description: "A rhythmic journey through the winding river lifelines of Bangladesh.",
    thumbnail: "https://i.ibb.co.com/RTwFJg5H/Screenshot-2026-02-08-at-8-10-13-PM.png",
    videoId: "1527322588352043",
    type: "facebook",
  },
  {
    title: "Green Serenity",
    description: "Exploring the lush tea gardens and mist-covered hills of Sreemangal.",
    thumbnail: "https://img.youtube.com/vi/XfTWMyT-DfQ/maxresdefault.jpg",
    videoId: "XfTWMyT-DfQ",
    type: "youtube",
  },
  {
    title: "Ratargul Echoes",
    description: "Navigating the mystic, submerged forests of the freshwater swamp.",
    thumbnail: "https://img.youtube.com/vi/O6m-PI8_zqw/maxresdefault.jpg",
    videoId: "O6m-PI8_zqw",
    type: "youtube",
  },
];

export async function seedDatabase() {
  try {
    const portfolioCount = await PortfolioItem.countDocuments();
    if (portfolioCount === 0) {
      console.log("🌱 Seeding portfolio items...");
      await PortfolioItem.insertMany(portfolioSeed || []);
    }

    const exploreCount = await ExploreItem.countDocuments();
    if (exploreCount === 0) {
      console.log("🌱 Seeding explore items...");
      await ExploreItem.insertMany(exploreSeed);
    }

    const videosCount = await VideoItem.countDocuments();
    if (videosCount === 0) {
      console.log("🌱 Seeding video items...");
      await VideoItem.insertMany(videosSeed);
    }
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
}
