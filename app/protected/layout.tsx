"use client";
import { ThemeProvider } from "@/components/theme-provider";
import React from "react";

import { Sidebar } from "./_components/sidebar";
import { Content } from "./_components/content/Content";
import { Header } from "./_components/content/Header";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [sidebarOpen, setSidebarOpen] = React.useState(true);
	const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

	return (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			<div className="flex h-screen bg-background">
				<Sidebar sidebarOpen={sidebarOpen} />
				<Content headerComponent={<Header toggleSidebar={toggleSidebar} />}>
					{children}
				</Content>
			</div>
		</ThemeProvider>
	);
}
