import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Filter,
  Heart,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronDown,
} from "lucide-react";

interface HeaderFiltersProps {
  showFavorites: boolean;
  onFavoritesChange: (show: boolean) => void;
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSortChange: (sortBy: string, sortOrder: "asc" | "desc") => void;
}

const HeaderFilters: React.FC<HeaderFiltersProps> = ({
  showFavorites,
  onFavoritesChange,
  sortBy,
  sortOrder,
  onSortChange,
}) => {
  const handleSortChange = (newSortBy: string) => {
    if (sortBy === newSortBy) {
      onSortChange(newSortBy, sortOrder === "asc" ? "desc" : "asc");
    } else {
      onSortChange(newSortBy, "desc");
    }
  };

  const sortOptions = [
    { key: "updated", label: "Last Updated" },
    { key: "created", label: "Created Date" },
    { key: "name", label: "Name" },
    { key: "usage", label: "Usage Count" },
  ];

  const getSortIcon = (optionKey: string) => {
    if (sortBy !== optionKey) return <ArrowUpDown className="w-4 h-4" />;
    return sortOrder === "asc" ? (
      <ArrowUp className="w-4 h-4" />
    ) : (
      <ArrowDown className="w-4 h-4" />
    );
  };

  const getCurrentSortLabel = () => {
    const currentSort = sortOptions.find((option) => option.key === sortBy);
    return currentSort?.label || "Last Updated";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="default" 
          className="shadow-sm hover:shadow-md transition-all duration-200"
        >
          <Filter className="w-5 h-5" />
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 bg-white shadow-lg border border-gray-200">
        <DropdownMenuLabel>Quick Filter</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => onFavoritesChange(!showFavorites)}
          className={`${
            showFavorites 
              ? "bg-blue-50 text-blue-700" 
              : ""
          }`}
        >
          <Heart
            className={`w-5 h-5 mr-2 ${showFavorites ? "fill-current" : ""}`}
          />
          Favorites Only
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel>Sort By</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={sortBy} onValueChange={handleSortChange}>
          {sortOptions.map((option) => (
            <DropdownMenuRadioItem key={option.key} value={option.key}>
              <div className="flex items-center justify-between w-full">
                <span>{option.label}</span>
                {getSortIcon(option.key)}
              </div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderFilters;
