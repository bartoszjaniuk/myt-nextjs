import { prisma } from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

// In your API route (e.g., pages/api/webhooks/auth.js)
export default async function handler(req: NextRequest) {
	if (req.method === "POST") {
		const event = await req.json();

		console.log("Evencik", event);
		console.log("event.event", event.event);

		// Check for email confirmation event
		if (event.event === "USER_UPDATED" && event.user.email_confirmed_at) {
			try {
				// Save user to your database
				await prisma.user.create({
					data: {
						id: event.user.id,
						email: event.user.email,

						// other fields
					},
				});
				return NextResponse.json({ success: true });
			} catch (error) {
				console.error("Error saving user:", error);
				return NextResponse.json({ error: "Failed to save user" });
			}
		}

		return NextResponse.json({ received: true });
	} else {
		return NextResponse.json({ received: true });
	}
}
