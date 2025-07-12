import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/prisma";

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } },
) {
	try {
		const supabase = await createClient();
		const {
			data: { user },
			error,
		} = await supabase.auth.getUser();

		if (error || !user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { id } = params;
		console.log("id", id);

		const project = await prisma.project.findUnique({
			where: { id: id },
			select: {
				id: true,
				name: true,
				description: true,
				color: true,
				createdAt: true,
				updatedAt: true,
				location: true,
				startDate: true,
				endDate: true,
				isActive: true,
				// Add other fields you need, but exclude relations unless explicitly included
			},
		});

		console.log("project", project);

		if (!project) {
			return NextResponse.json({ error: "Project not found" }, { status: 404 });
		}

		console.log("Raw project keys:", Object.keys(project));
		console.log("Raw project JSON:", JSON.stringify(project, null, 2));

		// const totalHours =
		// 	project.workLogs.reduce((sum, entry) => sum + (entry.duration || 0), 0) /
		// 	60;

		return NextResponse.json({
			...project,
			totalHours,
		});
	} catch (error) {
		console.error("Error fetching project:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
