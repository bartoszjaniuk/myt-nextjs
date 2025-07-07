import { prisma } from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

// In your API route (e.g., pages/api/webhooks/auth.js)
export async function POST(req: NextRequest) {
	const event = await req.json();

	console.log("Evencik", event);
	console.log("event.event", event.event);

	// Check for email confirmation event
	if (
		event.type === "UPDATE" &&
		event.table === "users" &&
		event.record.email_confirmed_at
	) {
		try {
			// Save user to your database
			const user = await prisma.user.create({
				data: {
					id: event.record.id,
					email: event.record.email,
				},
			});
			return NextResponse.json(user);
		} catch (error) {
			console.error("Error saving user:", error);
			return NextResponse.json({ error: "Failed to save user" });
		}
	}

	return NextResponse.json({ received: true });
}
