import { prisma } from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const event = await req.json();

	if (
		event.type === "UPDATE" &&
		event.table === "users" &&
		event.record.email_confirmed_at
	) {
		try {
			await prisma.user.upsert({
				where: { id: event.record.id },
				update: {},
				create: {
					id: event.record.id,
					email: event.record.email,
				},
			});
			return NextResponse.json({
				message: "Pomyślnie aktywowano konto uzytkownika",
			});
		} catch (error) {
			console.error("Error saving user:", error);
			return NextResponse.json({ error: "Failed to save user" });
		}
	}

	return NextResponse.json({ received: true });
}
