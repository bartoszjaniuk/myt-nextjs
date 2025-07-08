import { BarChart3 } from "lucide-react";
import React from "react";

export const SidebarHeader = ({ sidebarOpen }: { sidebarOpen: boolean }) => {
  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex items-center gap-2 px-2 py-1">
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <BarChart3 className="size-4" />
        </div>
        {sidebarOpen && (
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold text-sidebar-foreground">
              Manage your projects
            </span>
            <span className="truncate text-xs text-sidebar-foreground/70">
              Save your time
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
