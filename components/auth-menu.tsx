import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { UserDropdown } from "./user-dropdown";

export async function AuthMenu() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	return user ? (
		<UserDropdown user={user} />
	) : (
		<div className="flex gap-2">
			<Button asChild variant={"outline"}>
				<Link href="/auth/login">Sign in</Link>
			</Button>
			<Button asChild variant={"default"}>
				<Link href="/auth/sign-up">Get Started</Link>
			</Button>
		</div>
	);
}
