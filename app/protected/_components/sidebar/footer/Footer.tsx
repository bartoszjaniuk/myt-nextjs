"use client";
import * as React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "./User";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export const SidebarFooter = ({ sidebarOpen }: { sidebarOpen: boolean }) => {
	const router = useRouter();

	const onLogout = async () => {
		const supabase = createClient();
		await supabase.auth.signOut();
		router.push("/auth/login");
	};
	return (
		<div className="flex flex-col gap-2 p-2">
			<div className="group/menu-item relative">
				{sidebarOpen ? (
					<DropdownMenu>
						<User />
						<DropdownMenuContent
							className="w-56 rounded-lg"
							side="bottom"
							align="end"
							sideOffset={4}
						>
							<DropdownMenuItem>
								<span>Profile</span>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<span>Billing</span>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<span>Notifications</span>
							</DropdownMenuItem>
							<DropdownMenuItem onClick={onLogout}>
								<span>Log out</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				) : (
					<button
						className="flex w-full items-center justify-center rounded-md p-2 text-sm outline-none ring-sidebar-ring transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 text-sidebar-foreground"
						title="User Menu"
					>
						<Avatar className="h-8 w-8 rounded-lg">
							<AvatarImage
								src="/placeholder.svg?height=32&width=32"
								alt="ausrobdev"
							/>
							<AvatarFallback className="rounded-lg">AD</AvatarFallback>
						</Avatar>
					</button>
				)}
			</div>
		</div>
	);
};
