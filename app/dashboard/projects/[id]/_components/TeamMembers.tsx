import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
	Table,
} from "@/components/ui/table";
import { Plus, Edit, Trash2 } from "lucide-react";
import * as React from "react";
import { Project } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

export const TeamMembers = ({ project }: { project: Project }) => {
	const [isAddingUser, setIsAddingUser] = React.useState(false);

	return (
		<>
			<Card className="w-full">
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle>Assigned Team Members</CardTitle>
						<div className="flex space-x-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => setIsAddingUser(true)}
							>
								<Plus className="mr-2 h-4 w-4" />
								Add Member
							</Button>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>User</TableHead>
								<TableHead>Hours</TableHead>
								<TableHead>Rate</TableHead>
								<TableHead>Role</TableHead>
								<TableHead className="w-[100px]">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{project.assignedUsers.map((user) => (
								<TableRow key={user.id}>
									<TableCell className="font-medium">
										{user.user.name}
									</TableCell>
									<TableCell>{user.totalHours}</TableCell>
									<TableCell>${user.hourlyRate}/h</TableCell>
									<TableCell>
										<Badge variant="secondary">{user.role}</Badge>
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
			<Dialog open={isAddingUser} onOpenChange={setIsAddingUser}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Assign Team Member</DialogTitle>
						<DialogDescription>
							Add a team member to this project.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="user-email">Email Address</Label>
							<Input
								id="user-email"
								type="email"
								placeholder="user@example.com"
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="user-role">Role</Label>
							<Input id="user-role" placeholder="e.g., Developer, Designer" />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="user-rate">Hourly Rate</Label>
							<Input id="user-rate" type="number" placeholder="75.00" />
						</div>
					</div>
					<div className="flex justify-end space-x-2">
						<Button variant="outline" onClick={() => setIsAddingUser(false)}>
							Cancel
						</Button>
						<Button
							className="bg-[#3ed28f] hover:bg-[#35c085] text-white"
							onClick={() => setIsAddingUser(false)}
						>
							Assign User
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};
