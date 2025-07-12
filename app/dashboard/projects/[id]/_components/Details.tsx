"use client";
import * as React from "react";
import { Project } from "@prisma/client";
import { WorkLogs } from "./WorkLogs";
import { AdditionalCosts } from "./AdditionalCosts";
import { TeamMembers } from "./TeamMembers";
import { ProjectDetails } from "./ProjectDetails";
import { Header } from "./Header";

export const Details = ({ project }: { project: Project }) => {
	return (
		<div className="min-h-screen bg-background">
			<Header />
			<div className="container flex flex-col gap-6 pb-6">
				<ProjectDetails project={project} />
				<div className="flex flex-col lg:flex-row gap-6">
					<WorkLogs project={project} />
					<TeamMembers project={project} />
				</div>
				<AdditionalCosts project={project} />
			</div>
		</div>
	);
};
