import { PrismaClient, User } from "@prisma/client";

export async function seedProjects(
	prisma: PrismaClient,
	users: { userAlice: User; userBob: User },
) {
	console.log("🌱 Seeding projects...");

	const projectAlpha = await prisma.project.create({
		data: {
			name: "Alpha Project",
			description: "Project Alpha Description",
			ownerId: users.userAlice.id,
			color: "#FF5733",
		},
	});

	const projectBeta = await prisma.project.create({
		data: {
			name: "Beta Project",
			description: "Project Beta Description",
			ownerId: users.userBob.id,
			color: "#3DD08E",
		},
	});

	console.log("✅ Projects seeded.");
	return { projectAlpha, projectBeta };
}
