import { PrismaClient, Project } from "@prisma/client";
import { User } from "@supabase/supabase-js";

export async function seedProjectCosts(
	prisma: PrismaClient,
	users: { userAlice: User; userBob: User; userCharlie: User },
	projects: { projectAlpha: Project; projectBeta: Project },
) {
	console.log("🌱 Seeding project costs...");

	await prisma.projectCost.createMany({
		data: [
			{
				title: "AWS Hosting",
				amount: 1,
				price: 5000,
				receipt: null,
				projectId: projects.projectAlpha.id,
			},
			{
				title: "Figma License",
				amount: 2,
				price: 600,
				receipt: null,
				projectId: projects.projectBeta.id,
			},
		],
	});

	console.log("✅ Work logs seeded.");
}
