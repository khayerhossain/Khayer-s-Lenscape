import { NextResponse } from "next/server";
import { dbConnect, MomentItem } from "@/lib/db";

// GET: test the DB connection and write a test doc to Photos
export async function GET() {
  try {
    console.log("🔍 Testing DB connection...");
    await dbConnect();

    // Count existing
    const count = await MomentItem.countDocuments();
    console.log("📊 Current Photos count:", count);

    // Try inserting a test document
    const testDoc = await MomentItem.create({
      title: "DB Test Item - " + new Date().toISOString(),
      img: "https://via.placeholder.com/400",
      description: "Auto-generated test document",
      category: "Test",
    });

    console.log("✅ Test document created:", testDoc._id.toString());

    const newCount = await MomentItem.countDocuments();

    return NextResponse.json({
      success: true,
      message: "DB connection OK — test document inserted",
      testId: testDoc._id,
      before: count,
      after: newCount,
      connectionState: "connected",
    });
  } catch (error) {
    console.error("❌ DB Test failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stack: error.stack?.split("\n").slice(0, 5),
      },
      { status: 500 }
    );
  }
}

// DELETE: clean up all test items
export async function DELETE() {
  try {
    await dbConnect();
    const result = await MomentItem.deleteMany({ title: /^DB Test Item/ });
    return NextResponse.json({ success: true, deleted: result.deletedCount });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
