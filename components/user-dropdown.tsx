"use client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import React from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "./ui/button";
import Link from "next/link";

export const UserDropdown = ({ user }: { user: User }) => {
	const router = useRouter();

	const onLogout = async () => {
		const supabase = createClient();
		await supabase.auth.signOut();
		router.push("/auth/login");
	};
	return (
		<div className="flex gap-2 items-center">
			<Button asChild variant="default" size="sm">
				<Link href="/projects">Dashboard</Link>
			</Button>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button
						className="flex w-full items-center gap-2 overflow-hidden rounded-full p-2 text-left text-sm outline-none ring-sidebar-ring transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 text-sidebar-foreground"
						type="button"
					>
						<Avatar className="h-8 w-8 rounded-full">
							<AvatarImage
								src="/placeholder.svg?height=32&width=32"
								alt="ausrobdev"
							/>
							<AvatarFallback className="rounded-full">
								{user?.email?.slice(0, 2).toUpperCase()}
							</AvatarFallback>
						</Avatar>
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className="w-56 rounded-lg"
					side="bottom"
					align="end"
					sideOffset={4}
				>
					<DropdownMenuItem onClick={onLogout}>
						<span>Log out</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};
