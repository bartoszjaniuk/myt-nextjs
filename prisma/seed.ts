import { PrismaClient } from "@prisma/client";
import { seedUsers } from "./seeds/seedUsers";
import { seedProjects } from "./seeds/seedProjects";
import { seedAssignedProjects } from "./seeds/seedAssignedProjects";
import { seedWorkLogs } from "./seeds/seedWorkLogs";

const prisma = new PrismaClient();

async function main() {
	console.log("🌱 Starting seed...");
	const users = await seedUsers(prisma);
	const projects = await seedProjects(prisma, users);

	await Promise.all([
		seedAssignedProjects(prisma, users, projects),
		seedWorkLogs(prisma, users, projects),
	]);
	console.log("✅ Seeding completed.");
}

main()
	.catch((e) => {
		console.error("❌ Seeding error:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
