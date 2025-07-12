import * as React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Pause, Play } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export const Header = () => {
	const [isTracking, setIsTracking] = React.useState(false);

	return (
		<div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-16 items-center justify-between">
				<div className="flex items-center space-x-4">
					<Button variant="ghost" asChild>
						<Link href="/dashboard">
							<ArrowLeft className="mr-2 h-4 w-4" />
							Back to Dashboard
						</Link>
					</Button>
					<Separator
						orientation="vertical"
						className="data-[orientation=vertical]:min-h-6"
					/>
					<div className="flex items-center">
						<span className="text-xl font-bold">Details</span>
					</div>
				</div>
				<div className="flex items-center space-x-2">
					<Button variant="outline" size="sm">
						<Download className="mr-2 h-4 w-4" />
						Export Report
					</Button>
					<Button
						size="sm"
						className={`${
							isTracking
								? "bg-red-500 hover:bg-red-600"
								: "bg-[#3ed28f] hover:bg-[#35c085]"
						} text-white`}
						onClick={() => setIsTracking(!isTracking)}
					>
						{isTracking ? (
							<>
								<Pause className="mr-2 h-4 w-4" />
								Stop Timer
							</>
						) : (
							<>
								<Play className="mr-2 h-4 w-4" />
								Start Timer
							</>
						)}
					</Button>
				</div>
			</div>
		</div>
	);
};
