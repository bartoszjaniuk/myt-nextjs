import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
	Table,
} from "@/components/ui/table";
import { Download, Plus, MapPin, Edit, Trash2 } from "lucide-react";
import * as React from "react";
import { Project } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

export const WorkLogs = ({ project }: { project: Project }) => {
	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle>Work Logs</CardTitle>
					<div className="flex space-x-2">
						<Button variant="outline" size="sm">
							<Download className="mr-2 h-4 w-4" />
							Export
						</Button>
						<Button variant="outline" size="sm">
							<Plus className="mr-2 h-4 w-4" />
							Add Log
						</Button>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>User</TableHead>
							<TableHead>Date</TableHead>
							<TableHead>Time</TableHead>
							<TableHead>Hours</TableHead>
							<TableHead>Description</TableHead>
							<TableHead>Location</TableHead>
							<TableHead className="w-[100px]">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{project.workLogs.map((log) => (
							<TableRow key={log.id}>
								<TableCell className="font-medium">{log.user.name}</TableCell>
								<TableCell>{log.updatedAt}</TableCell>
								<TableCell>
									{log.startTime} - {log.endTime}
								</TableCell>
								<TableCell>
									<Badge variant="secondary">{log.duration / 60}h</Badge>
								</TableCell>
								<TableCell className="max-w-[200px] truncate">
									{log.description}
								</TableCell>
								<TableCell>
									<div className="flex items-center">
										<MapPin className="mr-1 h-3 w-3" />
										{log.location}
									</div>
								</TableCell>
								<TableCell>
									<div className="flex space-x-1">
										<Button variant="ghost" size="sm">
											<Edit className="h-4 w-4" />
										</Button>
										<Button variant="ghost" size="sm">
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};
