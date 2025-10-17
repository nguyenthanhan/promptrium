"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { SortKey } from "@/types";
import HeaderFilters from "@/components/Search/HeaderFilters";
import SearchBar from "@/components/Search/SearchBar";
import { Button } from "@/components/ui/button";
import { Plus, Download, Upload, Github } from "lucide-react";

interface PageHeaderProps {
  searchQuery: string;
  sortBy: SortKey;
  sortOrder: "asc" | "desc";
  onSearchChange: (query: string) => void;
  onCreateClick: () => void;
  onSortChange: (sortBy: SortKey, sortOrder: "asc" | "desc") => void;
  onExport: () => void;
  onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  searchQuery,
  sortBy,
  sortOrder,
  onSearchChange,
  onCreateClick,
  onSortChange,
  onExport,
  onImport,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <Image
              src="/logo.svg"
              alt="Promptrium Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <h1 className="text-2xl font-bold text-gray-900 whitespace-nowrap">
              Promptrium
            </h1>
          </div>

          {/* Search */}
          <div className="flex-1 min-w-0">
            <SearchBar
              value={searchQuery}
              onChange={onSearchChange}
              placeholder="Search prompts..."
            />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <HeaderFilters
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={onSortChange}
            />

            <Button
              variant="ghost"
              size="default"
              onClick={onExport}
              className="border border-gray-200 hover:bg-gray-100 transition-all duration-200"
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
                className="border border-gray-200 hover:bg-gray-100 transition-all duration-200"
              >
                <Upload className="w-5 h-5 mr-2" />
                Import
              </Button>
            </div>

            <Button
              variant="outline"
              size="default"
              onClick={onCreateClick}
              className="transition-all duration-200 border-gray-200 hover:bg-gray-100"
              aria-label="Create a new prompt"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Prompt
            </Button>

            <a
              href="https://github.com/nguyenthanhan/promptrium"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View source code on GitHub"
              className="inline-flex items-center justify-center font-medium rounded-lg p-2 border border-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 text-sm bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-500"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
