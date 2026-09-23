import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      phone,
      email,
      treatment,
      focusAreas,
      healthFund,
      preferredDay,
      preferredTime,
      symptoms,
    } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone number are required." },
        { status: 400 }
      );
    }

    // Ensure table exists
    await sql`
      CREATE TABLE IF NOT EXISTS massage_bookings (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT,
        treatment TEXT NOT NULL,
        focus_areas TEXT,
        health_fund TEXT,
        preferred_day TEXT,
        preferred_time TEXT,
        symptoms TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    const serializedFocusAreas = Array.isArray(focusAreas)
      ? focusAreas.join(", ")
      : (focusAreas || "");

    const result = await sql`
      INSERT INTO massage_bookings (
        name,
        phone,
        email,
        treatment,
        focus_areas,
        health_fund,
        preferred_day,
        preferred_time,
        symptoms
      )
      VALUES (
        ${name},
        ${phone},
        ${email || null},
        ${treatment || "remedial-60"},
        ${serializedFocusAreas},
        ${healthFund || null},
        ${preferredDay || null},
        ${preferredTime || null},
        ${symptoms || null}
      )
      RETURNING id;
    `;

    const id = result[0]?.id;
    return NextResponse.json({ success: true, id }, { status: 200 });
  } catch (error: any) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create booking" },
      { status: 500 }
    );
  }
}
