import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PanelLeft, Search, Download, Calendar } from "lucide-react";
import React from "react";

export const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
	return (
		<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background">
			<Button
				variant="ghost"
				size="icon"
				onClick={toggleSidebar}
				className="h-7 w-7"
			>
				<PanelLeft className="h-4 w-4" />
				<span className="sr-only">Toggle Sidebar</span>
			</Button>
			<div className="flex items-center gap-2 flex-1">
				<div className="relative flex-1 max-w-md">
					<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input placeholder="Search" className="pl-8 bg-background" />
					<kbd className="pointer-events-none absolute right-2 top-2.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
						<span className="text-xs">⌘</span>K
					</kbd>
				</div>
			</div>
			<div className="ml-auto flex items-center gap-2">
				<ModeToggle />
				<Button variant="outline" size="sm">
					<Download className="h-4 w-4 mr-2" />
					Download
				</Button>
				<Button variant="outline" size="sm">
					<Calendar className="h-4 w-4 mr-2" />
					Pick a date
				</Button>
			</div>
		</header>
	);
};
