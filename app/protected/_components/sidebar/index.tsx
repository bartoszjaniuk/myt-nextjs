import React from "react";
import { SidebarHeader } from "./header/Header";
import { SidebarContent } from "./content/Content";
import { SidebarFooter } from "./footer/Footer";

export const Sidebar = ({ sidebarOpen }: { sidebarOpen: boolean }) => {
	return (
		<div
			className={`transition-all duration-300 ease-in-out ${
				sidebarOpen ? "w-64" : "w-16"
			} border-r bg-sidebar flex-shrink-0`}
		>
			<div className="flex h-full flex-col">
				<SidebarHeader sidebarOpen={sidebarOpen} />
				<SidebarContent sidebarOpen={sidebarOpen} />
				<SidebarFooter sidebarOpen={sidebarOpen} />
			</div>
		</div>
	);
};
