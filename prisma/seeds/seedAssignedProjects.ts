import { PrismaClient, Project, Role } from "@prisma/client";
import { User } from "@supabase/supabase-js";

export async function seedAssignedProjects(
	prisma: PrismaClient,
	users: { userAlice: User; userBob: User; userCharlie: User },
	projects: { projectAlpha: Project; projectBeta: Project },
) {
	console.log("🌱 Seeding assigned projects...");

	await prisma.assignedProject.createMany({
		data: [
			{
				userId: users.userAlice.id,
				projectId: projects.projectAlpha.id,
				role: Role.ADMIN,
				hourlyRate: 100,
			},
			{
				userId: users.userBob.id,
				projectId: projects.projectAlpha.id,
				role: Role.EMPLOYEE,
				hourlyRate: 20,
			},
			{
				userId: users.userCharlie.id,
				projectId: projects.projectAlpha.id,
				role: Role.EMPLOYEE,
				hourlyRate: 10,
			},
			{
				userId: users.userBob.id,
				projectId: projects.projectBeta.id,
				role: Role.ADMIN,
				hourlyRate: 1900,
			},
			{
				userId: users.userAlice.id,
				projectId: projects.projectBeta.id,
				role: Role.EMPLOYER,
				hourlyRate: 1800,
			},
		],
	});

	console.log("✅ Assigned projects seeded.");
}
