import { PrismaClient } from "@prisma/client";

export async function seedUsers(prisma: PrismaClient) {
	console.log("🌱 Seeding users...");

	const userAlice = await prisma.user.create({
		data: { email: "alice@example.com", name: "Alice" },
	});

	const userBob = await prisma.user.create({
		data: { email: "bob@example.com", name: "Bob" },
	});

	const userCharlie = await prisma.user.create({
		data: { email: "charlie@example.com", name: "Charlie" },
	});

	console.log("✅ Users seeded.");
	return { userAlice, userBob, userCharlie };
}
