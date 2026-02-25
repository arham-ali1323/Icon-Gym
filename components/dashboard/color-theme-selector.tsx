"use client";

import { Palette } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useDashboardTheme, COLOR_THEMES } from "./dashboard-theme-provider";

export function ColorThemeSelector() {
  const { activeColorTheme, setActiveColorTheme } = useDashboardTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-orange-500 border-none hover:bg-orange-900 text-white font-bold"
        >
          <Palette className="h-4 w-4 text-white font-bold" />
          <span className="hidden sm:inline">Colors</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-dark-100 border-primary-border">
        {COLOR_THEMES.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            onClick={() => setActiveColorTheme(theme)}
            className="flex items-center gap-3 cursor-pointer hover:bg-primary-bg text-white"
          >
            <div
              className="w-4 h-4 rounded-full border-2 border-gray-600"
              style={{ backgroundColor: theme.primary }}
            />
            <span>{theme.name}</span>
            {activeColorTheme.value === theme.value && (
              <div className="ml-auto w-2 h-2 rounded-full bg-current" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
