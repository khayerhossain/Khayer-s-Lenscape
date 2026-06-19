import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { dbConnect, PortfolioItem, MomentItem, ExploreItem, VideoItem } from "@/lib/db";

// Helper to verify admin token
function verifyAdmin(request) {
  const token = request.cookies.get("admin_token")?.value;
  if (!token) {
    console.warn("⚠️ No admin_token cookie found");
    return false;
  }
  try {
    const secret = process.env.JWT_SECRET || "lenscape_secret_key_2026_xyz";
    const decoded = jwt.verify(token, secret);
    return decoded && decoded.role === "admin";
  } catch (error) {
    console.warn("⚠️ JWT verification failed:", error.message);
    return false;
  }
}

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const itemType = searchParams.get("type");

    let items = [];
    if (itemType === "portfolio") {
      items = await PortfolioItem.find({}).sort({ createdAt: -1 }).lean();
    } else if (itemType === "moments") {
      items = await MomentItem.find({}).sort({ createdAt: -1 }).lean();
    } else if (itemType === "explore") {
      items = await ExploreItem.find({}).sort({ createdAt: -1 }).lean();
    } else if (itemType === "videos") {
      items = await VideoItem.find({}).sort({ createdAt: -1 }).lean();
    } else {
      return NextResponse.json({ success: true, message: "Specify type=portfolio|moments|explore|videos" });
    }

    return NextResponse.json({ success: true, items });
  } catch (error) {
    console.error("❌ GET items error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Error fetching items" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  // 1. Auth check
  const isAdmin = verifyAdmin(request);
  if (!isAdmin) {
    console.warn("❌ Unauthorized POST attempt to /api/admin/items");
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    // 2. Connect to DB
    await dbConnect();

    // 3. Parse body
    const rawBody = await request.text();
    console.log("📦 Raw POST body length:", rawBody.length);
    const data = JSON.parse(rawBody);
    const { itemType, ...itemData } = data;

    console.log("📌 Item type:", itemType);
    console.log("📌 Item fields:", Object.keys(itemData));

    // 4. Strip extra fields that don't belong in schema
    let newItem;
    if (itemType === "moments") {
      const cleanData = {
        title: itemData.title,
        description: itemData.description || "",
        date: itemData.date || "",
        location: itemData.location || "",
        img: itemData.img,
        span: itemData.span || "md:col-span-1 md:row-span-1",
        category: itemData.category || "",
      };
      console.log("🖼️ Creating MomentItem in Photos collection...");
      newItem = await MomentItem.create(cleanData);
      console.log("✅ MomentItem created with _id:", newItem._id.toString());
    } else if (itemType === "portfolio") {
      const cleanData = {
        title: itemData.title,
        description: itemData.description || "",
        date: itemData.date || "",
        img: itemData.img,
        category: itemData.category || "",
      };
      console.log("🖼️ Creating PortfolioItem...");
      newItem = await PortfolioItem.create(cleanData);
      console.log("✅ PortfolioItem created with _id:", newItem._id.toString());
    } else if (itemType === "explore") {
      const cleanData = {
        title: itemData.title,
        location: itemData.location || "",
        src: itemData.src,
      };
      console.log("🖼️ Creating ExploreItem...");
      newItem = await ExploreItem.create(cleanData);
      console.log("✅ ExploreItem created with _id:", newItem._id.toString());
    } else if (itemType === "videos") {
      const cleanData = {
        title: itemData.title,
        description: itemData.description || "",
        thumbnail: itemData.thumbnail,
        videoId: itemData.videoId,
        type: itemData.type,
      };
      console.log("🎬 Creating VideoItem...");
      newItem = await VideoItem.create(cleanData);
      console.log("✅ VideoItem created with _id:", newItem._id.toString());
    } else {
      return NextResponse.json({ success: false, message: `Invalid item type: "${itemType}"` }, { status: 400 });
    }

    return NextResponse.json({ success: true, item: newItem });
  } catch (error) {
    console.error("❌ POST items error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Error creating item" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();
    const data = await request.json();
    const { itemType, id, ...updateData } = data;

    if (!id) {
      return NextResponse.json({ success: false, message: "Missing item id" }, { status: 400 });
    }

    let updatedItem;
    if (itemType === "portfolio") {
      updatedItem = await PortfolioItem.findByIdAndUpdate(id, updateData, { new: true });
    } else if (itemType === "moments") {
      updatedItem = await MomentItem.findByIdAndUpdate(id, updateData, { new: true });
    } else if (itemType === "explore") {
      updatedItem = await ExploreItem.findByIdAndUpdate(id, updateData, { new: true });
    } else if (itemType === "videos") {
      updatedItem = await VideoItem.findByIdAndUpdate(id, updateData, { new: true });
    } else {
      return NextResponse.json({ success: false, message: "Invalid item type" }, { status: 400 });
    }

    if (!updatedItem) {
      return NextResponse.json({ success: false, message: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, item: updatedItem });
  } catch (error) {
    console.error("❌ PUT items error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Error updating item" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const itemType = searchParams.get("type");
    const id = searchParams.get("id");

    if (!itemType || !id) {
      return NextResponse.json({ success: false, message: "Missing type or id" }, { status: 400 });
    }

    let deletedItem;
    if (itemType === "portfolio") {
      deletedItem = await PortfolioItem.findByIdAndDelete(id);
    } else if (itemType === "moments") {
      deletedItem = await MomentItem.findByIdAndDelete(id);
    } else if (itemType === "explore") {
      deletedItem = await ExploreItem.findByIdAndDelete(id);
    } else if (itemType === "videos") {
      deletedItem = await VideoItem.findByIdAndDelete(id);
    } else {
      return NextResponse.json({ success: false, message: "Invalid item type" }, { status: 400 });
    }

    if (!deletedItem) {
      return NextResponse.json({ success: false, message: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    console.error("❌ DELETE items error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Error deleting item" },
      { status: 500 }
    );
  }
}
