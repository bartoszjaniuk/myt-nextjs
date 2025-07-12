"use client";

import React from "react";
import { Info, TrendingUp, Bell, FileText, BarChart, Eye } from "lucide-react";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function MetricCard({
	title,
	value,
	change,
	changeType,
	icon: Icon,
	description,
}: {
	title: string;
	value: string;
	change: string;
	changeType: "positive" | "negative";
	icon?: React.ComponentType<{ className?: string }>;
	description?: string;
}) {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium flex items-center gap-2">
					{title}
					<Info className="h-4 w-4 text-muted-foreground" />
				</CardTitle>
				{Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">{value}</div>
				<div
					className={`text-xs flex items-center gap-1 ${
						changeType === "positive" ? "text-green-600" : "text-red-600"
					}`}
				>
					<TrendingUp className="h-3 w-3" />
					{change}
				</div>
				{description && (
					<p className="text-xs text-muted-foreground mt-1">{description}</p>
				)}
			</CardContent>
		</Card>
	);
}

function ChartCard({
	title,
	description,
	children,
	tabs,
}: {
	title: string;
	description: string;
	children: React.ReactNode;
	tabs?: { label: string; value: string }[];
}) {
	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<div>
						<CardTitle className="text-lg">{title}</CardTitle>
						<CardDescription>{description}</CardDescription>
					</div>
					{tabs && (
						<Tabs defaultValue={tabs[0].value} className="w-auto">
							<TabsList className="grid w-full grid-cols-2">
								{tabs.map((tab) => (
									<TabsTrigger key={tab.value} value={tab.value}>
										{tab.label}
									</TabsTrigger>
								))}
							</TabsList>
						</Tabs>
					)}
				</div>
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	);
}

function AreaChart() {
	return (
		<div className="space-y-4">
			<div className="h-64 relative">
				<svg className="w-full h-full" viewBox="0 0 400 200">
					<defs>
						<linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
							<stop offset="0%" stopColor="rgb(239 68 68)" stopOpacity="0.3" />
							<stop
								offset="100%"
								stopColor="rgb(239 68 68)"
								stopOpacity="0.1"
							/>
						</linearGradient>
						<linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
							<stop offset="0%" stopColor="rgb(34 197 94)" stopOpacity="0.3" />
							<stop
								offset="100%"
								stopColor="rgb(34 197 94)"
								stopOpacity="0.1"
							/>
						</linearGradient>
					</defs>
					<path
						d="M 0 120 Q 50 80 100 100 T 200 90 T 300 110 T 400 100 L 400 200 L 0 200 Z"
						fill="url(#gradient1)"
					/>
					<path
						d="M 0 140 Q 50 120 100 130 T 200 120 T 300 140 T 400 130 L 400 200 L 0 200 Z"
						fill="url(#gradient2)"
					/>
					<path
						d="M 0 120 Q 50 80 100 100 T 200 90 T 300 110 T 400 100"
						stroke="rgb(239 68 68)"
						strokeWidth="2"
						fill="none"
					/>
					<path
						d="M 0 140 Q 50 120 100 130 T 200 120 T 300 140 T 400 130"
						stroke="rgb(34 197 94)"
						strokeWidth="2"
						fill="none"
					/>
				</svg>
			</div>
			<div className="flex justify-between text-xs text-muted-foreground">
				<span>Jan</span>
				<span>Feb</span>
				<span>Mar</span>
				<span>Apr</span>
				<span>May</span>
				<span>Jun</span>
			</div>
		</div>
	);
}

function TrafficSourceChart() {
	const sources = [
		{ name: "Google", value: 186, color: "bg-green-500" },
		{ name: "Social", value: 305, color: "bg-green-600" },
		{ name: "Direct", value: 237, color: "bg-green-700" },
	];

	const maxValue = Math.max(...sources.map((s) => s.value));

	return (
		<div className="space-y-4">
			{sources.map((source, index) => (
				<div key={index} className="flex items-center justify-between">
					<span className="text-sm text-muted-foreground w-16">
						{source.name}
					</span>
					<div className="flex-1 mx-4">
						<div className="h-2 bg-muted rounded-full overflow-hidden">
							<div
								className={`h-full ${source.color} rounded-full`}
								style={{ width: `${(source.value / maxValue) * 100}%` }}
							/>
						</div>
					</div>
					<span className="text-sm font-medium w-8 text-right">
						{source.value}
					</span>
				</div>
			))}
			<div className="flex justify-between text-xs text-muted-foreground mt-4">
				<span>0k</span>
				<span>80k</span>
				<span>160k</span>
				<span>240k</span>
				<span>320k</span>
			</div>
		</div>
	);
}

function CircularProgress({ value, label }: { value: number; label: string }) {
	const circumference = 2 * Math.PI * 45;
	const strokeDasharray = circumference;
	const strokeDashoffset = circumference - (value / 100) * circumference;

	return (
		<div className="flex flex-col items-center">
			<div className="relative w-32 h-32">
				<svg
					className="w-full h-full transform -rotate-90"
					viewBox="0 0 100 100"
				>
					<circle
						cx="50"
						cy="50"
						r="45"
						stroke="currentColor"
						strokeWidth="8"
						fill="none"
						className="text-muted"
					/>
					<circle
						cx="50"
						cy="50"
						r="45"
						stroke="currentColor"
						strokeWidth="8"
						fill="none"
						strokeDasharray={strokeDasharray}
						strokeDashoffset={strokeDashoffset}
						className="text-green-600"
						strokeLinecap="round"
					/>
				</svg>
				<div className="absolute inset-0 flex flex-col items-center justify-center">
					<span className="text-2xl font-bold">{value}</span>
					<span className="text-xs text-muted-foreground">{label}</span>
				</div>
			</div>
		</div>
	);
}

export function AdminDashboard() {
	return (
		<div className="space-y-4">
			<h1 className="text-3xl font-bold">Dashboard</h1>

			<Tabs defaultValue="overview" className="space-y-4">
				<TabsList>
					<TabsTrigger value="overview" className="flex items-center gap-2">
						<Eye className="h-4 w-4" />
						Overview
					</TabsTrigger>
					<TabsTrigger value="analytics" className="flex items-center gap-2">
						<BarChart className="h-4 w-4" />
						Analytics
					</TabsTrigger>
					<TabsTrigger value="reports" className="flex items-center gap-2">
						<FileText className="h-4 w-4" />
						Reports
					</TabsTrigger>
					<TabsTrigger
						value="notifications"
						className="flex items-center gap-2"
					>
						<Bell className="h-4 w-4" />
						Notifications
					</TabsTrigger>
				</TabsList>

				<TabsContent value="overview" className="space-y-4">
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
						<div className="md:col-span-2">
							<ChartCard
								title="Sales"
								description="Visualize sales performance trends"
								tabs={[
									{ label: "Month", value: "month" },
									{ label: "Week", value: "week" },
								]}
							>
								<div className="grid gap-4 md:grid-cols-2">
									<MetricCard
										title="Net Sales"
										value="$4 567 820"
										change="24.5% (+10)"
										changeType="positive"
									/>
									<MetricCard
										title="Orders"
										value="1246"
										change="5.5% (-15)"
										changeType="negative"
									/>
								</div>
								<div className="mt-4 h-64 bg-muted/20 rounded-lg flex items-center justify-center">
									<span className="text-muted-foreground">Sales Chart</span>
								</div>
							</ChartCard>
						</div>

						<div className="md:col-span-2">
							<ChartCard
								title="Visitors"
								description="Key visitor information at a glance"
								tabs={[
									{ label: "Month", value: "month" },
									{ label: "Week", value: "week" },
								]}
							>
								<div className="grid gap-4 md:grid-cols-2">
									<MetricCard
										title="New Visitors"
										value="36 786"
										change="66.7% (+10)"
										changeType="positive"
									/>
									<MetricCard
										title="Returning"
										value="467"
										change="5.5% (-6)"
										changeType="negative"
									/>
								</div>
								<div className="mt-4">
									<AreaChart />
								</div>
							</ChartCard>
						</div>
					</div>

					<div className="grid gap-4 md:grid-cols-3">
						<ChartCard
							title="Traffic Source"
							description="Gain insights into where your visitors are coming from."
							tabs={[
								{ label: "Month", value: "month" },
								{ label: "Week", value: "week" },
							]}
						>
							<TrafficSourceChart />
						</ChartCard>

						<ChartCard
							title="Customers"
							description="Customer performance and growth trends."
						>
							<div className="space-y-4">
								<AreaChart />
								<div className="flex items-center gap-2 text-sm">
									<TrendingUp className="h-4 w-4 text-green-600" />
									<span>Trending up by 5.2% this month</span>
								</div>
							</div>
						</ChartCard>

						<ChartCard
							title="Buyers Profile"
							description="Discover key insights into the buyer's preferences"
						>
							<div className="space-y-4">
								<CircularProgress value={200} label="Buyers" />
								<div className="flex items-center gap-2 text-sm">
									<TrendingUp className="h-4 w-4 text-green-600" />
									<span>Trending up by 5.2% this month</span>
								</div>
							</div>
						</ChartCard>
					</div>
				</TabsContent>

				<TabsContent value="analytics">
					<div className="grid gap-4">
						<Card>
							<CardHeader>
								<CardTitle>Analytics Overview</CardTitle>
								<CardDescription>
									Detailed analytics and insights for your dashboard.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground">
									Analytics content would go here...
								</p>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				<TabsContent value="reports">
					<div className="grid gap-4">
						<Card>
							<CardHeader>
								<CardTitle>Reports</CardTitle>
								<CardDescription>
									Generate and view detailed reports.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground">
									Reports content would go here...
								</p>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				<TabsContent value="notifications">
					<div className="grid gap-4">
						<Card>
							<CardHeader>
								<CardTitle>Notifications</CardTitle>
								<CardDescription>
									Manage your notification settings and history.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground">
									Notifications content would go here...
								</p>
							</CardContent>
						</Card>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
