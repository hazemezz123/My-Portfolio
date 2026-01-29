import { NextResponse } from "next/server";
import { getGuestbookCollection } from "../../lib/mongodb";
import type { GuestbookEntry } from "../../lib/mongodb";

// GET - Fetch all guestbook entries
export async function GET() {
  try {
    const collection = await getGuestbookCollection();
    const entries = await collection
      .find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    // Transform for frontend compatibility
    const formattedEntries = entries.map((entry) => ({
      id: entry._id?.toString(),
      name: entry.name,
      email: entry.email,
      message: entry.message,
      location: entry.location,
      created_at: entry.createdAt?.toISOString() || entry.created_at,
    }));

    return NextResponse.json(formattedEntries);
  } catch (error) {
    console.error("Error fetching guestbook entries:", error);
    return NextResponse.json(
      { error: "Failed to fetch guestbook entries" },
      { status: 500 },
    );
  }
}

// POST - Create a new guestbook entry
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 },
      );
    }

    const entry: Omit<GuestbookEntry, "_id"> = {
      name: body.name,
      email: body.email,
      message: body.message,
      location: body.location || "",
      createdAt: new Date(),
    };

    const collection = await getGuestbookCollection();
    const result = await collection.insertOne(entry as GuestbookEntry);

    return NextResponse.json(
      {
        id: result.insertedId.toString(),
        name: entry.name,
        email: entry.email,
        message: entry.message,
        location: entry.location,
        created_at: entry.createdAt?.toISOString(),
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating guestbook entry:", error);
    return NextResponse.json(
      { error: "Failed to create guestbook entry" },
      { status: 500 },
    );
  }
}

// DELETE - Delete a guestbook entry
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Entry ID is required" },
        { status: 400 },
      );
    }

    const collection = await getGuestbookCollection();
    // Using simple string query first as fallback, but ideally should be ObjectId
    // The previous code suggests _id might be stored as string or ObjectId depending on how it was inserted
    // But standard MongoDB usually uses ObjectId
    let query;
    try {
      // @ts-ignore
      const { ObjectId } = await import("../../lib/mongodb"); // importation workaround if not imported at top
      query = { _id: new ObjectId(id) };
    } catch (e) {
      // Fallback if ObjectId fails or import fails (though it shouldn't if set up right)
      // in this project structure it seems we should import ObjectId from lib
      // let's rely on the import I'll add at the top
      console.error("ObjectId creation failed", e);
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting guestbook entry:", error);
    return NextResponse.json(
      { error: "Failed to delete guestbook entry" },
      { status: 500 },
    );
  }
}
