"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { useAuth } from "@/hooks/use-auth";
// import { useToast } from "@/hooks/use-toast";
import {
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  DollarSign,
  Clock,
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string | null;
  color: string;
  hourlyRate: number | null;
  isBillable: boolean;
  isActive: boolean;
  createdAt: string;
  totalHours: number;
}

const colorOptions = [
  "#3ECF8E",
  "#EF4444",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#84CC16",
];

export default function ProjectsPage() {
  // const { user } = useAuth();
  // const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: colorOptions[0],
    hourly_rate: "",
    is_billable: false,
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Network response was not ok");

      const data: Project[] = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      // toast({
      //   title: "Error",
      //   description: "Failed to fetch projects",
      //   variant: "destructive",
      // });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const projectData = {
        name: formData.name,
        description: formData.description || null,
        color: formData.color,
        hourlyRate: formData.hourly_rate
          ? Number.parseFloat(formData.hourly_rate)
          : null,
        isBillable: formData.is_billable,
      };

      if (editingProject) {
        const res = await fetch(`/api/projects`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingProject.id, ...projectData }),
        });
        if (!res.ok) throw new Error("Failed to update");
        // toast({
        //   title: "Success",
        //   description: "Project updated successfully",
        // });
      } else {
        const res = await fetch(`/api/projects`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(projectData),
        });
        if (!res.ok) throw new Error("Failed to create");
        // toast({
        //   title: "Success",
        //   description: "Project created successfully",
        // });
      }

      setDialogOpen(false);
      setEditingProject(null);
      setFormData({
        name: "",
        description: "",
        color: colorOptions[0],
        hourly_rate: "",
        is_billable: false,
      });
      fetchProjects();
    } catch (error) {
      console.error("Error saving project:", error);
      // toast({
      //   title: "Error",
      //   description: "Failed to save project",
      //   variant: "destructive",
      // });
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      description: project.description || "",
      color: project.color,
      hourly_rate: project.hourlyRate?.toString() || "",
      is_billable: project.isBillable,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (projectId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this project? This will also delete all associated time entries."
      )
    ) {
      return;
    }

    try {
      await fetch(`/api/projects?id=${projectId}`, { method: "DELETE" });

      // toast({
      //   title: "Success",
      //   description: "Project deleted successfully",
      // });
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
      // toast({
      //   title: "Error",
      //   description: "Failed to delete project",
      //   variant: "destructive",
      // });
    }
  };

  const toggleProjectStatus = async (projectId: string, isActive: boolean) => {
    try {
      await fetch(`/api/projects`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: projectId, isActive: !isActive }),
      });

      fetchProjects();
    } catch (error) {
      console.error("Error updating project status:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage your projects and track time across different clients.
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>
                  {editingProject ? "Edit Project" : "Create New Project"}
                </DialogTitle>
                <DialogDescription>
                  {editingProject
                    ? "Update your project details below."
                    : "Add a new project to start tracking time."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Project Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter project name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Project description (optional)"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Project Color</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="color"
                      type="color"
                      value={formData.color}
                      onChange={(e) =>
                        setFormData({ ...formData, color: e.target.value })
                      }
                      className="w-16 h-10"
                    />
                    <Input
                      value={formData.color}
                      onChange={(e) =>
                        setFormData({ ...formData, color: e.target.value })
                      }
                      placeholder="#3ECF8E"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="billable"
                    checked={formData.is_billable}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, is_billable: checked })
                    }
                  />
                  <Label htmlFor="billable">Billable project</Label>
                </div>
                {formData.is_billable && (
                  <div className="space-y-2">
                    <Label htmlFor="hourly_rate">Hourly Rate ($)</Label>
                    <Input
                      id="hourly_rate"
                      type="number"
                      step="0.01"
                      value={formData.hourly_rate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hourly_rate: e.target.value,
                        })
                      }
                      placeholder="0.00"
                    />
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button type="submit">
                  {editingProject ? "Update Project" : "Create Project"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {projects.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <h3 className="text-lg font-semibold">No projects yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first project to start tracking time.
              </p>
              <Button onClick={() => setDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Project
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project.id}
              className={`${!project.isActive ? "opacity-60" : ""}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: project.color }}
                    />
                    <div>
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      {project.description && (
                        <CardDescription className="mt-1">
                          {project.description}
                        </CardDescription>
                      )}
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(project)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          toggleProjectStatus(project.id, project.isActive)
                        }
                      >
                        {/* {project.isActive ? "Archive" : "Activate"} */}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(project.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Total Hours</span>
                    </div>
                    <span className="font-medium">
                      {project.totalHours?.toFixed(1) || "0.0"}h
                    </span>
                  </div>

                  {project.isBillable && (
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>Hourly Rate</span>
                      </div>
                      <span className="font-medium">
                        ${project.hourlyRate?.toFixed(2) || "0.00"}
                      </span>
                    </div>
                  )}

                  <div className="flex gap-2">
                    {project.isBillable && (
                      <Badge variant="secondary" className="text-xs">
                        Billable
                      </Badge>
                    )}
                    <Badge
                      variant={project.isActive ? "default" : "outline"}
                      className="text-xs"
                    >
                      {/* {project.isActive ? "Active" : "Archived"} */}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
