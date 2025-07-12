import {
	AlertTriangle,
	FolderOpen,
	Code,
	Home,
	Settings,
	Shield,
	Users,
} from "lucide-react";
import * as React from "react";

const data = {
	navMain: [
		{
			title: "General",
			items: [
				{
					title: "Dashboard",
					url: "/dashboard",
					icon: Home,
					isActive: true,
				},
				{
					title: "Projects",
					url: "/dashboard/projects",
					icon: FolderOpen,
				},
				{
					title: "Users",
					url: "/dashboard/users",
					icon: Users,
				},
			],
		},
		{
			title: "Pages",
			items: [
				{
					title: "Auth",
					url: "#",
					icon: Shield,
				},
				{
					title: "Errors",
					url: "#",
					icon: AlertTriangle,
				},
			],
		},
		{
			title: "Other",
			items: [
				{
					title: "Settings",
					url: "#",
					icon: Settings,
				},
				{
					title: "Developers",
					url: "#",
					icon: Code,
				},
			],
		},
	],
};

export const SidebarContent = ({ sidebarOpen }: { sidebarOpen: boolean }) => {
	return (
		<div className="flex min-h-0 flex-1 flex-col gap-2 overflow-auto p-2">
			{data.navMain.map((group) => (
				<div
					key={group.title}
					className="relative flex w-full min-w-0 flex-col"
				>
					{sidebarOpen && (
						<div className="flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70">
							{group.title}
						</div>
					)}
					<div className="w-full text-sm">
						<div className="flex w-full min-w-0 flex-col gap-1">
							{group.items.map((item) => (
								<div key={item.title} className="group/menu-item relative">
									<a
										href={item.url}
										className={`flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 ${
											item.isActive
												? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
												: "text-sidebar-foreground"
										} ${!sidebarOpen ? "justify-center" : ""}`}
										title={!sidebarOpen ? item.title : undefined}
									>
										<item.icon className="size-4 shrink-0" />
										{sidebarOpen && (
											<span className="truncate">{item.title}</span>
										)}
									</a>
								</div>
							))}
						</div>
					</div>
				</div>
			))}
		</div>
	);
};
