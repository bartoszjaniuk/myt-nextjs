"use client";
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export const User = () => {
	const [user, setUser] = React.useState<SupabaseUser | null>(null);
	const supabase = createClient();

	React.useEffect(() => {
		const fetchUser = async () => {
			const data = await supabase.auth.getUser();
			setUser(data.data.user);
		};
		fetchUser();
	}, [supabase]);

	return (
		<DropdownMenuTrigger asChild>
			<button
				className="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 text-sidebar-foreground"
				type="button"
			>
				<Avatar className="h-8 w-8 rounded-lg">
					<AvatarImage
						src="/placeholder.svg?height=32&width=32"
						alt="ausrobdev"
					/>
					<AvatarFallback className="rounded-lg">
						{user?.email?.slice(0, 2).toUpperCase()}
					</AvatarFallback>
				</Avatar>
				<div className="grid flex-1 text-left text-sm leading-tight">
					<span className="truncate font-semibold">
						{user?.email?.split("@")[0]}
					</span>
					<span className="truncate text-xs text-sidebar-foreground/70">
						{user?.email}
					</span>
				</div>
				<ChevronDown className="ml-auto size-4" />
			</button>
		</DropdownMenuTrigger>
	);
};
