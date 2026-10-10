import { NextResponse } from "next/server";
import { insertBooking } from "@/lib/db";

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

    const booking = await insertBooking({
      name,
      phone,
      email,
      treatment: treatment || "remedial-60",
      focusAreas,
      healthFund,
      preferredDay,
      preferredTime,
      symptoms,
    });

    return NextResponse.json({ success: true, booking, id: (booking as any)?.id }, { status: 200 });
  } catch (error: any) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create booking" },
      { status: 500 }
    );
  }
}
