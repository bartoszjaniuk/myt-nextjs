import { PrismaClient } from "@prisma/client";
import { User } from "@supabase/supabase-js";

export async function seedProjects(
	prisma: PrismaClient,
	users: { userAlice: User; userBob: User; userCharlie: User },
) {
	console.log("🌱 Seeding projects...");

	const projectAlpha = await prisma.project.create({
		data: {
			name: "Alpha Project",
			description: "Project Alpha Description",
			ownerId: users.userAlice.id,
			location: "Racibórz",
			color: "#FF5733",
			startDate: new Date("2025-07-01"),
			endDate: new Date("2025-08-01"),
		},
	});

	const projectBeta = await prisma.project.create({
		data: {
			name: "Beta Project",
			description: "Project Beta Description",
			ownerId: users.userBob.id,
			color: "#3DD08E",
			location: "Remote",
			startDate: new Date("2025-07-01"),
			endDate: new Date("2025-10-01"),
		},
	});

	const projectGamma = await prisma.project.create({
		data: {
			name: "Gamma Project",
			description: "Project Gamma Description",
			ownerId: users.userAlice.id,
			color: "#3DD08E",
			location: "Remote",
			startDate: new Date("2025-07-01"),
			endDate: new Date("2025-10-01"),
			isActive: false,
		},
	});

	console.log("✅ Projects seeded.");
	return { projectAlpha, projectBeta, projectGamma };
}
