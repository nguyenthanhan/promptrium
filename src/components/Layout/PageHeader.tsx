"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Settings, SortKey } from "@/types";
import HeaderFilters from "@/components/Search/HeaderFilters";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Download,
  Upload,
  Github,
  ChevronDown,
  LayoutGrid,
  Rows,
  Square,
  Maximize,
  Minimize,
} from "lucide-react";

interface PageHeaderProps {
  settings: Settings;
  showFavorites: boolean;
  sortBy: SortKey;
  sortOrder: "asc" | "desc";
  onCreateClick: () => void;
  onViewModeChange: (viewMode: string) => void;
  onLayoutDensityChange: (density: string) => void;
  onFavoritesChange: (show: boolean) => void;
  onSortChange: (sortBy: SortKey, sortOrder: "asc" | "desc") => void;
  onExport: () => void;
  onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  settings,
  showFavorites,
  sortBy,
  sortOrder,
  onCreateClick,
  onViewModeChange,
  onLayoutDensityChange,
  onFavoritesChange,
  onSortChange,
  onExport,
  onImport,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const getViewModeIcon = () => {
    switch (settings.view_mode) {
      case "grid":
        return <LayoutGrid className="w-5 h-5" />;
      case "list":
        return <Rows className="w-5 h-5" />;
      default:
        return <LayoutGrid className="w-5 h-5" />;
    }
  };

  const getDensityIcon = (density: string) => {
    switch (density) {
      case "compact":
        return <Minimize className="w-4 h-4 mr-2" />;
      case "comfortable":
        return <Square className="w-4 h-4 mr-2" />;
      case "expanded":
        return <Maximize className="w-4 h-4 mr-2" />;
      default:
        return <Square className="w-4 h-4 mr-2" />;
    }
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Image
              src="/logo.svg"
              alt="Promptrium Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <h1 className="text-2xl font-bold text-gray-900">Promptrium</h1>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="default"
                  className="shadow-sm hover:shadow-md transition-all duration-200"
                >
                  {getViewModeIcon()}
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="min-w-32 w-auto max-w-48 sm:max-w-56 bg-white shadow-lg border border-gray-200"
              >
                <DropdownMenuLabel>Layout View</DropdownMenuLabel>
                <DropdownMenuRadioGroup
                  value={settings.view_mode}
                  onValueChange={onViewModeChange}
                >
                  <DropdownMenuRadioItem value="grid">
                    <LayoutGrid className="w-4 h-4 mr-2" />
                    Grid View
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="list">
                    <Rows className="w-4 h-4 mr-2" />
                    List View
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
                {settings.view_mode === "grid" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Layout Density</DropdownMenuLabel>
                    <DropdownMenuRadioGroup
                      value={settings.layout_density}
                      onValueChange={onLayoutDensityChange}
                    >
                      <DropdownMenuRadioItem value="compact">
                        {getDensityIcon("compact")}
                        Compact
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="comfortable">
                        {getDensityIcon("comfortable")}
                        Comfortable
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="expanded">
                        {getDensityIcon("expanded")}
                        Expanded
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <HeaderFilters
              showFavorites={showFavorites}
              onFavoritesChange={onFavoritesChange}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={onSortChange}
            />

            <Button
              variant="ghost"
              size="default"
              onClick={onExport}
              className="shadow-sm hover:shadow-md transition-all duration-200"
            >
              <Download className="w-5 h-5 mr-2" />
              Export
            </Button>

            <div className="relative">
              <input
                type="file"
                accept=".json,application/json"
                onChange={onImport}
                className="sr-only"
                ref={fileInputRef}
              />
              <Button
                variant="ghost"
                size="default"
                aria-label="Import from JSON"
                onClick={() => fileInputRef.current?.click()}
                className="shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Upload className="w-5 h-5 mr-2" />
                Import
              </Button>
            </div>

            <a
              href="https://github.com/nguyenthanhan/promptrium"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-medium rounded-lg p-2 shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 text-sm bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-500"
            >
              <Github className="w-4 h-4" />
            </a>

            <Button
              variant="default"
              size="default"
              onClick={onCreateClick}
              className="shadow-sm hover:shadow-md transition-all duration-200"
              aria-label="Create a new prompt"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Prompt
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
