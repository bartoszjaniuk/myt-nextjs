import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";

export async function seedUsers(prisma: PrismaClient) {
	console.log("🌱 Seeding users...");

	const supabaseAdmin = createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.SUPABASE_SERVICE_ROLE_KEY!,
	);

	async function createUser(email: string, name: string) {
		const { data, error } = await supabaseAdmin.auth.admin.createUser({
			email,
			password: "securePassword123",
			email_confirm: true,
			user_metadata: { name },
		});

		if (error) throw error;

		const userId = data.user.id;

		await prisma.user.upsert({
			where: { email },
			update: {},
			create: { id: userId, email, name },
		});

		console.log(`✅ User ${name} (${email}) seeded.`);
		return data.user;
	}

	const userAlice = await createUser("alice@example.com", "Alice");
	const userBob = await createUser("bob@example.com", "Bob");
	const userCharlie = await createUser("charlie@example.com", "Charlie");

	console.log("✅ All users seeded.");
	return { userAlice, userBob, userCharlie };
}
