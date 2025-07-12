import * as React from "react";
import { prisma } from "@/lib/prisma/prisma";
import { createClient } from "@/lib/supabase/server";
import { Details } from "./_components/Details";

const fetchData = async (id: string) => {
	try {
		const supabase = await createClient();
		const {
			data: { user },
			error,
		} = await supabase.auth.getUser();

		if (error || !user) {
			return Response.json({ error: "Unauthorized" }, { status: 401 });
		}

		const project = await prisma.project.findUnique({
			where: {
				id,
			},
			include: {
				assignedUsers: {
					include: {
						user: {
							select: {
								id: true,
								name: true,
								email: true,
							},
						},
					},
				},
				workLogs: {
					include: {
						user: {
							select: {
								id: true,
								name: true,
								email: true,
							},
						},
					},
				},
				costs: true,
			},
		});

		if (!project) {
			return Response.json({ error: "Project not found" }, { status: 404 });
		}

		const totalHours =
			project.workLogs.reduce((sum, entry) => sum + (entry.duration || 0), 0) /
			60;

		return Response.json({
			...project,
			totalHours,
		});
	} catch (error) {
		console.error("Error fetching project:", error);
		return Response.json({ error: "Internal server error" }, { status: 500 });
	}
};

export default async function ProjectsPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const id = (await params).id;

	const data = await fetchData(id);
	const project = await data.json();
	return (
		<React.Suspense fallback={<div>Loading...</div>}>
			<Details project={project} />
		</React.Suspense>
	);
}
