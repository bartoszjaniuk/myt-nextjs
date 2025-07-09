import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	Clock,
	Smartphone,
	BarChart3,
	DollarSign,
	Users,
	Zap,
} from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Image from "next/image";
import { hasEnvVars } from "@/lib/utils";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthMenu } from "@/components/auth-menu";

export default function HomePage() {
	return (
		<div className="min-h-screen bg-background">
			{/* Header */}
			<header className="container mx-auto px-4 py-6">
				<nav className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Image src="/logo.svg" alt="Logo" width={32} height={32} />
						<span className="text-2xl font-bold">Project Tracker</span>
					</div>
					<div className="flex items-center gap-4">
						{!hasEnvVars ? <EnvVarWarning /> : <AuthMenu />}
					</div>
				</nav>
			</header>

			{/* Hero Section */}
			<section className="container mx-auto px-4 py-20 text-center">
				<Badge variant="secondary" className="mb-4">
					🚀 Now with Mobile App Support
				</Badge>
				<h1 className="text-5xl font-bold tracking-tight mb-6">
					Professional Time Tracking
					<span className="text-primary"> Made Simple</span>
				</h1>
				<p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
					Track time across projects, generate detailed reports, and boost your
					productivity. Perfect for freelancers, agencies, and small businesses.
				</p>
				<div className="flex items-center justify-center gap-4">
					<Link href="/auth/signup">
						<Button size="lg" className="text-lg px-8">
							Start Free Trial
						</Button>
					</Link>
					<Link href="/auth/login">
						<Button
							variant="outline"
							size="lg"
							className="text-lg px-8 bg-transparent"
						>
							Sign In
						</Button>
					</Link>
				</div>
			</section>

			{/* Features Grid */}
			<section className="container mx-auto px-4 py-20">
				<div className="text-center mb-16">
					<h2 className="text-3xl font-bold mb-4">
						Everything you need to track time
					</h2>
					<p className="text-muted-foreground text-lg">
						Powerful features designed for modern professionals
					</p>
				</div>

				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					<Card>
						<CardHeader>
							<Smartphone className="h-10 w-10 text-primary mb-2" />
							<CardTitle>Mobile Check-in/out</CardTitle>
							<CardDescription>
								Start and stop timers from anywhere with our mobile app. Works
								offline and syncs when online.
							</CardDescription>
						</CardHeader>
					</Card>

					<Card>
						<CardHeader>
							<BarChart3 className="h-10 w-10 text-green-600 mb-2" />
							<CardTitle>Detailed Reports</CardTitle>
							<CardDescription>
								Generate comprehensive reports with filtering, export to
								CSV/PDF, and track billable hours.
							</CardDescription>
						</CardHeader>
					</Card>

					<Card>
						<CardHeader>
							<DollarSign className="h-10 w-10 text-yellow-600 mb-2" />
							<CardTitle>Billing Integration</CardTitle>
							<CardDescription>
								Set hourly rates, mark projects as billable, and calculate
								revenue automatically.
							</CardDescription>
						</CardHeader>
					</Card>

					<Card>
						<CardHeader>
							<Users className="h-10 w-10 text-purple-600 mb-2" />
							<CardTitle>Project Management</CardTitle>
							<CardDescription>
								Organize work by projects, assign colors, and track time across
								multiple clients.
							</CardDescription>
						</CardHeader>
					</Card>

					<Card>
						<CardHeader>
							<Zap className="h-10 w-10 text-red-600 mb-2" />
							<CardTitle>Real-time Sync</CardTitle>
							<CardDescription>
								Your data syncs instantly across all devices. Never lose track
								of your time.
							</CardDescription>
						</CardHeader>
					</Card>

					<Card>
						<CardHeader>
							<Clock className="h-10 w-10 text-indigo-600 mb-2" />
							<CardTitle>GPS Tracking</CardTitle>
							<CardDescription>
								Optional location tracking for check-ins to verify work
								locations and client visits.
							</CardDescription>
						</CardHeader>
					</Card>
				</div>
			</section>

			<section className="container mx-auto py-24">
				<div className="text-center mb-16">
					<h2 className="text-3xl font-bold mb-4">
						Simple, transparent pricing
					</h2>
					<p className="text-xl text-muted-foreground">
						Choose the plan that fits your needs
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
					<Card>
						<CardHeader>
							<CardTitle>Starter</CardTitle>
							<CardDescription>Perfect for freelancers</CardDescription>
							<div className="text-3xl font-bold">
								$9<span className="text-sm font-normal">/month</span>
							</div>
						</CardHeader>
						<CardContent>
							<ul className="space-y-2 text-sm">
								<li>✓ Up to 3 projects</li>
								<li>✓ Mobile app access</li>
								<li>✓ Basic reports</li>
								<li>✓ CSV export</li>
								<li>✓ Email support</li>
							</ul>
							<Button className="w-full mt-6">Get Started</Button>
						</CardContent>
					</Card>

					<Card className="border-primary">
						<CardHeader>
							<Badge className="w-fit mb-2">Most Popular</Badge>
							<CardTitle>Professional</CardTitle>
							<CardDescription>For growing teams</CardDescription>
							<div className="text-3xl font-bold">
								$19<span className="text-sm font-normal">/month</span>
							</div>
						</CardHeader>
						<CardContent>
							<ul className="space-y-2 text-sm">
								<li>✓ Unlimited projects</li>
								<li>✓ Up to 10 team members</li>
								<li>✓ Advanced reports</li>
								<li>✓ PDF export</li>
								<li>✓ GPS tracking</li>
								<li>✓ Priority support</li>
							</ul>
							<Button className="w-full mt-6">Get Started</Button>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Enterprise</CardTitle>
							<CardDescription>For large organizations</CardDescription>
							<div className="text-3xl font-bold">
								$49<span className="text-sm font-normal">/month</span>
							</div>
						</CardHeader>
						<CardContent>
							<ul className="space-y-2 text-sm">
								<li>✓ Everything in Professional</li>
								<li>✓ Unlimited team members</li>
								<li>✓ Custom integrations</li>
								<li>✓ Advanced analytics</li>
								<li>✓ Dedicated support</li>
								<li>✓ Custom branding</li>
							</ul>
							<Button className="w-full mt-6">Contact Sales</Button>
						</CardContent>
					</Card>
				</div>
			</section>

			{/* CTA Section */}
			<section className="container mx-auto px-4 py-20 text-center">
				<div className="rounded-xl border-[0.5px] bg-layout text-card-foreground shadow-sm p-12">
					<h2 className="text-3xl font-bold mb-4">
						Ready to boost your productivity?
					</h2>
					<p className="text-xl mb-8 opacity-90">
						Join thousands of professionals who trust TimeTracker Pro
					</p>
					<Link href="/auth/signup">
						<Button size="lg" variant="secondary" className="text-lg px-8">
							Start Your Free Trial
						</Button>
					</Link>
				</div>
			</section>

			{/* Footer */}
			<footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
				<p>
					Powered by{" "}
					<a
						href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
						target="_blank"
						className="font-bold hover:underline"
						rel="noreferrer"
					>
						Supabase
					</a>
				</p>
				<ThemeSwitcher />
			</footer>
		</div>
	);
}
