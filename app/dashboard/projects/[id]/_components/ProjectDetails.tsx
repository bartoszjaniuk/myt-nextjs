"use client";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import { User, MapPin, Calendar, Edit } from "lucide-react";
import * as React from "react";
import { Project } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

function calculateProgress(startDate: Date, endDate: Date): number {
	const now = new Date();

	const total = endDate.getTime() - startDate.getTime();
	const elapsed = now.getTime() - startDate.getTime();

	const progress = Math.min(Math.max(elapsed / total, 0), 1);

	return Math.floor(progress * 100); // percentage
}

export const ProjectDetails = ({ project }: { project: Project }) => {
	const [isEditingProject, setIsEditingProject] = React.useState(false);

	const startDate = new Date(project.startDate);
	const endDate = new Date(project.endDate);
	const progress = calculateProgress(startDate, endDate);
	return (
		<Card>
			<CardHeader>
				<div className="flex items-start justify-between">
					<div className="flex-1">
						<div className="flex items-center space-x-3 mb-2">
							<CardTitle className="text-2xl">{project.name}</CardTitle>
							<Badge
								variant={project.isActive ? "default" : "secondary"}
								className={
									project.isActive ? "bg-[#3ed28f] hover:bg-[#35c085]" : ""
								}
							>
								{project.isActive ? "Active" : "Inactive"}
							</Badge>
						</div>
						<div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
							<span className="flex items-center">
								<User className="mr-1 h-4 w-4" />
								{project.ownerId}
							</span>
							<span className="flex items-center">
								<MapPin className="mr-1 h-4 w-4" />
								{project.location}
							</span>
							<span className="flex items-center">
								<Calendar className="mr-1 h-4 w-4" />
								Due {new Date(project.endDate).toLocaleDateString("pl-PL")}
							</span>
						</div>
						<CardDescription className="text-base leading-relaxed">
							{project.description}
						</CardDescription>
					</div>
					<Button
						variant="outline"
						size="sm"
						onClick={() => setIsEditingProject(true)}
					>
						<Edit className="mr-2 h-4 w-4" />
						Edit
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<div>
						<div className="flex items-center justify-between text-sm mb-2">
							<span>Project Progress</span>
							<span>{progress}% Complete</span>
						</div>
						<Progress value={progress} className="h-3" />
					</div>
					<div className="grid grid-cols-2 md:grid-cols-5 gap-2 pt-4 border-t">
						<div>
							<div className="text-2xl font-bold text-[#3ed28f]">
								{project.totalHours}h
							</div>
							<div className="text-xs text-muted-foreground">Hours Logged</div>
						</div>
						<div>
							<div className="text-2xl font-bold">
								{project.assignedUsers.length}
							</div>
							<div className="text-xs text-muted-foreground">Team Members</div>
						</div>
						<div>
							<div className="text-2xl font-bold">
								{project.totalLaborCost || 10000} zł
							</div>
							<div className="text-xs text-muted-foreground">Labor Costs</div>
						</div>
						<div>
							<div className="text-2xl font-bold">
								{project.totalAdditionalCosts || 230} zł
							</div>
							<div className="text-xs text-muted-foreground">
								Additional Costs
							</div>
						</div>
						<div>
							<div className="text-2xl font-bold">
								{project.totalLaborCost + project.totalAdditionalCosts || 10500}
								zł
							</div>
							<div className="text-xs text-muted-foreground">Total</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
