import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
	Table,
} from "@/components/ui/table";
import { Plus, Receipt, Edit, Trash2, Upload } from "lucide-react";
import React from "react";
import { Project } from "@prisma/client";

export const AdditionalCosts = ({ project }: { project: Project }) => {
	const [isAddingCost, setIsAddingCost] = React.useState(false);

	return (
		<>
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle>Additional Costs</CardTitle>
						<Button
							variant="outline"
							size="sm"
							onClick={() => setIsAddingCost(true)}
						>
							<Plus className="mr-2 h-4 w-4" />
							Add Cost
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Title</TableHead>
								<TableHead>Category</TableHead>
								<TableHead>Amount</TableHead>
								<TableHead>Unit Price</TableHead>
								<TableHead>Total</TableHead>
								<TableHead>Date</TableHead>
								<TableHead>Receipt</TableHead>
								<TableHead className="w-[100px]">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{project.costs.map((cost) => (
								<TableRow key={cost.id}>
									<TableCell className="font-medium">{cost.title}</TableCell>
									<TableCell>
										<Badge variant="outline">{cost.category}</Badge>
									</TableCell>
									<TableCell>{cost.amount}</TableCell>
									<TableCell>${cost.price}</TableCell>
									<TableCell className="font-medium">${cost.total}</TableCell>
									<TableCell>{cost.date}</TableCell>
									<TableCell>
										<Button variant="ghost" size="sm">
											<Receipt className="mr-1 h-3 w-3" />
											{cost.receipt}
										</Button>
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
					<div className="mt-4 flex justify-end">
						<div className="text-right">
							<div className="text-sm text-muted-foreground">
								Total Additional Costs
							</div>
							<div className="text-2xl font-bold text-[#3ed28f]">
								{/* ${project.totalAdditionalCosts.toLocaleString()} */}
								missing data
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Add Cost Dialog */}
			<Dialog open={isAddingCost} onOpenChange={setIsAddingCost}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Add Additional Cost</DialogTitle>
						<DialogDescription>
							Add a new cost item to this project.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="cost-title">Title</Label>
							<Input id="cost-title" placeholder="Enter cost title" />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="cost-category">Category</Label>
							<Input
								id="cost-category"
								placeholder="e.g., Assets, Infrastructure"
							/>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="grid gap-2">
								<Label htmlFor="cost-amount">Amount</Label>
								<Input id="cost-amount" type="number" placeholder="1" />
							</div>
							<div className="grid gap-2">
								<Label htmlFor="cost-price">Unit Price</Label>
								<Input id="cost-price" type="number" placeholder="0.00" />
							</div>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="cost-receipt">Receipt</Label>
							<div className="flex space-x-2">
								<Input id="cost-receipt" type="file" accept=".pdf,.jpg,.png" />
								<Button variant="outline" size="sm">
									<Upload className="h-4 w-4" />
								</Button>
							</div>
						</div>
					</div>
					<div className="flex justify-end space-x-2">
						<Button variant="outline" onClick={() => setIsAddingCost(false)}>
							Cancel
						</Button>
						<Button
							className="bg-[#3ed28f] hover:bg-[#35c085] text-white"
							onClick={() => setIsAddingCost(false)}
						>
							Add Cost
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};
