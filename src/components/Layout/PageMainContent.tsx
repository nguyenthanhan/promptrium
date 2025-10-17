"use client";

import React from "react";
import Image from "next/image";
import PromptCard from "@/components/Prompt/PromptCard";
import { Button } from "@/components/ui/button";
import { Prompt } from "@/types";
import { Plus } from "lucide-react";

interface PageMainContentProps {
  prompts: Prompt[];
  filteredPrompts: Prompt[];
  mounted: boolean;
  onCreateClick: () => void;
  onEditPrompt: (prompt: Prompt) => void;
  onDeletePrompt: (prompt: Prompt) => void;
  onCopyPrompt: (prompt: Prompt) => void;
  onToggleFavorite: (prompt: Prompt) => void;
}

export const PageMainContent: React.FC<PageMainContentProps> = ({
  prompts,
  filteredPrompts,
  mounted,
  onCreateClick,
  onEditPrompt,
  onDeletePrompt,
  onCopyPrompt,
  onToggleFavorite,
}) => {
  if (!mounted) {
    // Loading state during hydration
    return (
      <main className="w-full">
        <div className="text-center py-12">
          <div className="animate-pulse">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-48 mx-auto mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-32 mx-auto"></div>
          </div>
        </div>
      </main>
    );
  }

  if (filteredPrompts.length === 0) {
    return (
      <main className="w-full">
        <div className="text-center py-12">
          {!Array.isArray(prompts) || prompts.length === 0 ? (
            // Empty state - no prompts
            <div className="space-y-4">
              <Image
                src="/logo.svg"
                alt="Promptrium Logo"
                width={64}
                height={64}
                className="w-16 h-16 mx-auto opacity-40"
              />
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  No prompts yet
                </h3>
                <p className="text-gray-500 mt-2">
                  Create your first prompt to get started.
                </p>
              </div>
              <Button
                variant="default"
                onClick={onCreateClick}
                aria-label="Create your first prompt"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Prompt
              </Button>
            </div>
          ) : (
            // No search results
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                <Image
                  src="/logo.svg"
                  alt="Promptrium Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  No prompts found
                </h3>
                <p className="text-gray-500 mt-2">
                  Try adjusting your search or filters.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredPrompts.map((prompt) => (
          <PromptCard
            key={prompt.id}
            prompt={prompt}
            onEdit={onEditPrompt}
            onDelete={onDeletePrompt}
            onCopy={onCopyPrompt}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </main>
  );
};
