import { PrismaClient, User, Project, Role } from "@prisma/client";

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
				hourlyRate: 2000,
			},
			{
				userId: users.userBob.id,
				projectId: projects.projectAlpha.id,
				role: Role.EMPLOYEE,
				hourlyRate: 1200,
			},
			{
				userId: users.userCharlie.id,
				projectId: projects.projectAlpha.id,
				role: Role.EMPLOYEE,
				hourlyRate: 1100,
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
