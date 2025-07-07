import { PrismaClient, User, Project, LogMethod } from "@prisma/client";

export async function seedWorkLogs(
	prisma: PrismaClient,
	users: { userAlice: User; userBob: User; userCharlie: User },
	projects: { projectAlpha: Project; projectBeta: Project },
) {
	console.log("🌱 Seeding work logs...");

	await prisma.workLog.createMany({
		data: [
			{
				userId: users.userAlice.id,
				projectId: projects.projectAlpha.id,
				description: "Planning architecture",
				duration: 120,
				date: new Date("2025-07-01T09:00:00Z"),
				method: LogMethod.MANUAL,
			},
			{
				userId: users.userBob.id,
				projectId: projects.projectAlpha.id,
				description: "Implemented authentication",
				duration: 90,
				date: new Date("2025-07-02T10:00:00Z"),
				method: LogMethod.TIMER,
			},
			{
				userId: users.userCharlie.id,
				projectId: projects.projectAlpha.id,
				description: "Styled landing page",
				duration: 60,
				date: new Date("2025-07-03T11:00:00Z"),
				method: LogMethod.MANUAL,
			},
			{
				userId: users.userBob.id,
				projectId: projects.projectBeta.id,
				description: "Database modeling",
				duration: 150,
				date: new Date("2025-07-04T08:30:00Z"),
				method: LogMethod.TIMER,
			},
			{
				userId: users.userAlice.id,
				projectId: projects.projectBeta.id,
				description: "Project planning session",
				duration: 45,
				date: new Date("2025-07-05T14:00:00Z"),
				method: LogMethod.MANUAL,
			},
		],
	});

	console.log("✅ Work logs seeded.");
}
